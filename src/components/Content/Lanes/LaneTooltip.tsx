import React from "react";
import { TimelineItem } from "../../../types";

interface LaneTooltipProps {
  item: TimelineItem;
  name: string;
  durationInDays: number;
  getDurationLabel: (days: number) => string;
}

const LaneTooltip: React.FC<LaneTooltipProps> = ({
  item,
  name,
  durationInDays,
  getDurationLabel,
}) => {
  return (
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
  );
};

export default LaneTooltip;
