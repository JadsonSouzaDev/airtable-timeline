import { useState, useRef, useEffect } from "react";
import { getDateUTC } from "../../../utils/assignLanes";
import { TimelineItem, MonthData } from "../../../types";

interface UseLaneLogicProps {
  item: TimelineItem;
  selectedMonthIndex: number;
  months: (MonthData & { label: string })[];
  isSelected: boolean;
  setSelectedLane: (item: TimelineItem | null) => void;
}

export const useLaneLogic = ({
  item,
  selectedMonthIndex,
  months,
  isSelected,
  setSelectedLane,
}: UseLaneLogicProps) => {
  const [name, setName] = useState(item.name);
  const [isHovering, setIsHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const laneRef = useRef<HTMLDivElement>(null);

  // Calculate dates and modifications
  const start = getDateUTC(item.start);
  const end = getDateUTC(item.end);
  let startModified = false;
  let endModified = false;

  // If the start date is not in the selected month, set it to the first day of the month
  if (
    start.getMonth() !== months[selectedMonthIndex].month ||
    start.getFullYear() !== months[selectedMonthIndex].year
  ) {
    start.setDate(1);
    start.setMonth(months[selectedMonthIndex].month);
    startModified = true;
  }

  // If the end date is not in the selected month, set it to the last day of the month
  if (
    end.getMonth() !== months[selectedMonthIndex].month ||
    end.getFullYear() !== months[selectedMonthIndex].year
  ) {
    const newDay = new Date(
      months[selectedMonthIndex].year,
      months[selectedMonthIndex].month + 1,
      0
    ).getDate();
    end.setDate(newDay);
    end.setMonth(months[selectedMonthIndex].month + 1);
    endModified = true;
  }

  // Calculate the duration of the event in days
  const duration = end.getTime() - start.getTime();
  const durationInDays = Math.floor(duration / (1000 * 60 * 60 * 24));

  // Calculate the grid column start and end
  const gridColumnStart = start.getDate();
  const gridColumnEnd =
    durationInDays > 1
      ? gridColumnStart + durationInDays + 1
      : gridColumnStart + 1;

  // Get color based on duration
  const getDurationColor = (days: number) => {
    if (days <= 1) return "bg-green-100 border-green-300 text-green-700";
    if (days <= 3) return "bg-blue-100 border-blue-300 text-blue-700";
    if (days <= 7) return "bg-yellow-100 border-yellow-300 text-yellow-700";
    if (days <= 14) return "bg-orange-100 border-orange-300 text-orange-700";
    return "bg-red-100 border-red-300 text-red-700";
  };

  // Get duration label
  const getDurationLabel = (days: number) => {
    if (days === 1) return "1 day";
    if (days <= 7) return `${days} days`;
    if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  };

  // Handle click outside
  useEffect(() => {
    if (!isSelected) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (laneRef.current && !laneRef.current.contains(event.target as Node)) {
        setSelectedLane(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelected, setSelectedLane]);

  // Event handlers
  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowTooltip(false);
  };

  const handleClick = () => {
    setSelectedLane(item);
  };

  return {
    name,
    setName,
    isHovering,
    showTooltip,
    laneRef,
    startModified,
    endModified,
    durationInDays,
    gridColumnStart,
    gridColumnEnd,
    getDurationColor,
    getDurationLabel,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
};
