import React from "react";
import { TimelineItem } from "../../../types";
import LaneEditButton from "./LaneEditButton";

interface LaneDisplayProps {
  name: string;
  item: TimelineItem;
  isHovering: boolean;
  setSelectedLane: (item: TimelineItem | null) => void;
}

const LaneDisplay: React.FC<LaneDisplayProps> = ({
  name,
  item,
  isHovering,
  setSelectedLane,
}) => {
  return (
    <>
      <span className="text-xs truncate font-semibold">{name}</span>
      {isHovering && (
        <LaneEditButton item={item} setSelectedLane={setSelectedLane} />
      )}
    </>
  );
};

export default LaneDisplay;
