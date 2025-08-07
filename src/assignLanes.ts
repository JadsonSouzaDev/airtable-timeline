import { TimelineItem, MonthData } from "./types";

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */
export const assignLanes = (
  items: TimelineItem[],
  month: number,
  year: number
): TimelineItem[][] => {
  const intervalItems = items.filter(
    (item) =>
      (getDateUTC(item.start).getMonth() === month &&
        getDateUTC(item.start).getFullYear() === year) ||
      (getDateUTC(item.end).getMonth() === month &&
        getDateUTC(item.end).getFullYear() === year)
  );
  const sortedItems = intervalItems.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  const lanes: TimelineItem[][] = [];

  function assignItemToLane(item: TimelineItem) {
    for (const lane of lanes) {
      if (
        new Date(lane[lane.length - 1].end).getTime() <
        new Date(item.start).getTime()
      ) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
};

export const getDateUTC = (date: string): Date => {
  return new Date(new Date(date).toLocaleString("en-US", { timeZone: "UTC" }));
};

export const getStartDateLimit = (items: TimelineItem[]): Date => {
  const sortedItems = items.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  return getDateUTC(sortedItems[0].start);
};

export const getEndDateLimit = (items: TimelineItem[]): Date => {
  const sortedItems = items.sort(
    (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime()
  );
  return getDateUTC(sortedItems[sortedItems.length - 1].end);
};

export const getMonths = (
  items: TimelineItem[]
): (MonthData & { label: string })[] => {
  const start = getStartDateLimit(items).setDate(1);
  const end = getEndDateLimit(items).setDate(28);
  const months: (MonthData & { label: string })[] = [];
  const currentDate = new Date(start);
  while (currentDate <= new Date(end)) {
    const monthYear = `${currentDate.toLocaleString("default", {
      month: "long",
    })} ${currentDate.getFullYear()}`;

    if (!months.find((month) => month.label === monthYear)) {
      months.push({
        label: monthYear,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
      });
    }
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
};
