import React, { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getDateUTC } from "../../utils/assignLanes";
import { TimelineItem, MonthData } from "../../types";

interface LaneProps {
  item: TimelineItem;
  selectedMonthIndex: number;
  months: (MonthData & { label: string })[];
  isSelected: boolean;
  setSelectedLane: (item: TimelineItem | null) => void;
}

const Lane: React.FC<LaneProps> = ({
  item,
  selectedMonthIndex,
  months,
  isSelected,
  setSelectedLane,
}) => {
  const [name, setName] = useState(item.name);
  const [isHovering, setIsHovering] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const laneRef = useRef<HTMLDivElement>(null);
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

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelectedLane(null);
    }
  };

  return (
    <div
      ref={laneRef}
      key={item.id}
      onClick={() => setSelectedLane(item)}
      onMouseEnter={() => {
        setIsHovering(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowTooltip(false);
      }}
      className={`cursor-pointer shadow-md border-2 flex flex-row items-center justify-center gap-4 px-2 h-10 relative ${
        isSelected
          ? "bg-blue-500 border-blue-500 text-white"
          : getDurationColor(durationInDays)
      } ${!startModified ? "rounded-s-lg" : ""} ${
        !endModified ? "rounded-e-lg" : ""
      }`}
      style={{ gridColumnStart, gridColumnEnd }}
    >
      {!isSelected && (
        <>
          <span className="text-xs truncate font-semibold">{name}</span>
          {isHovering && !isSelected && (
            <button
              className="absolute right-1 bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLane(item);
              }}
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </>
      )}
      {isSelected && (
        <input
          type="text"
          className="w-full bg-transparent border-none outline-none text-xs font-semibold"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      )}
      
      {/* Tooltip */}
      {showTooltip && !isSelected && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-50 whitespace-nowrap">
          <div className="font-semibold">{name}</div>
          <div className="text-gray-300">
            {item.start} → {item.end}
          </div>
          <div className="text-gray-300">
            Duration: {getDurationLabel(durationInDays)}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
      
      {/* Duration indicator bar */}
      {!isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b">
          <div 
            className="h-full bg-current opacity-30 rounded-b"
            style={{ 
              width: `${Math.min(100, (durationInDays / 31) * 100)}%` 
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Lane;
