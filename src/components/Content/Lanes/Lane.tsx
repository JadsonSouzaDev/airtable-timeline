import React from "react";
import { TimelineItem, MonthData } from "../../../types";
import { useLaneLogic } from "./useLaneLogic";
import LaneDisplay from "./LaneDisplay";
import LaneInput from "./LaneInput";
import LaneTooltip from "./LaneTooltip";
import LaneDurationBar from "./LaneDurationBar";

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
  const {
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
  } = useLaneLogic({
    item,
    selectedMonthIndex,
    months,
    isSelected,
    setSelectedLane,
  });

  return (
    <div
      ref={laneRef}
      key={item.id}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <LaneDisplay
          name={name}
          item={item}
          isHovering={isHovering}
          setSelectedLane={setSelectedLane}
        />
      )}
      {isSelected && (
        <LaneInput
          name={name}
          setName={setName}
          setSelectedLane={setSelectedLane}
        />
      )}
      
      {/* Tooltip */}
      {showTooltip && !isSelected && (
        <LaneTooltip
          item={item}
          name={name}
          durationInDays={durationInDays}
          getDurationLabel={getDurationLabel}
        />
      )}
      
      {/* Duration indicator bar */}
      {!isSelected && (
        <LaneDurationBar durationInDays={durationInDays} />
      )}
    </div>
  );
};

export default Lane;
