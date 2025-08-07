export interface TimelineItem {
  id: string;
  name: string;
  start: string; // YYYY-MM-DD format
  end: string; // YYYY-MM-DD format
}

export interface Lane {
  items: TimelineItem[];
  laneIndex: number;
}

export type LaneArray = TimelineItem[][];

export interface MonthData {
  month: number;
  year: number;
}

export interface TimelineItemWithLane extends TimelineItem {
  laneIndex: number;
  startDay: number;
  endDay: number;
  width: number;
}
