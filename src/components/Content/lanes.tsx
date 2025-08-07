import React, { useState } from "react";
import Lane from "./lane";
import { TimelineItem, MonthData, LaneArray } from "../../types";

interface LanesProps {
  lanes: LaneArray;
  days: number;
  selectedMonthIndex: number;
  months: (MonthData & { label: string })[];
}

const Lanes: React.FC<LanesProps> = ({
  lanes,
  days,
  selectedMonthIndex,
  months,
}) => {
  const [selectedLane, setSelectedLane] = useState<TimelineItem | null>(null);

  return (
    <div className="flex flex-col gap-4 z-10">
      {lanes.map((lane, key) => (
        <div
          key={key}
          className="grid gap-x-1"
          style={{ gridTemplateColumns: `repeat(${days}, 1fr)` }}
        >
          {lane.map((item) => (
            <Lane
              key={item.id}
              item={item}
              selectedMonthIndex={selectedMonthIndex}
              months={months}
              isSelected={selectedLane?.id === item.id}
              setSelectedLane={setSelectedLane}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Lanes;
