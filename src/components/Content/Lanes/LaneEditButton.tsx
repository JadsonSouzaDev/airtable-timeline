import React from "react";
import { Pencil } from "lucide-react";
import { TimelineItem } from "../../../types";

interface LaneEditButtonProps {
  item: TimelineItem;
  setSelectedLane: (item: TimelineItem | null) => void;
}

const LaneEditButton: React.FC<LaneEditButtonProps> = ({
  item,
  setSelectedLane,
}) => {
  return (
    <button
      className="absolute right-1 bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedLane(item);
      }}
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
};

export default LaneEditButton;
