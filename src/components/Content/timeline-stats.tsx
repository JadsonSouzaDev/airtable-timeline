import { LaneArray } from "../../types";
import { BarChart, Circle, Square } from "lucide-react";

const TimelineStats: React.FC<{ lanes: LaneArray }> = ({ lanes }) => {
  const totalItems = lanes.flat().length;
  const avgDuration =
    lanes.flat().reduce((acc, item) => {
      const start = new Date(item.start);
      const end = new Date(item.end);
      const duration = Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return acc + duration;
    }, 0) / totalItems;

  return (
    <div className="p-3 rounded-lg text-sm text-gray-500">
      <div className="flex gap-4">
        <span className="flex items-center gap-1">
          <BarChart />
          {totalItems} items
        </span>
        <span className="flex items-center gap-1">
          <Circle />
          Average: {Math.round(avgDuration)} days
        </span>
        <span className="flex items-center gap-1">
          <Square />
          {lanes.length} lanes
        </span>
      </div>
    </div>
  );
};

export default TimelineStats;
