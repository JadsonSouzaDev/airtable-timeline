import React from "react";

interface DaysHeaderProps {
  days: number[];
}

const DaysColumns: React.FC<DaysHeaderProps> = ({ days }) => {
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${days.length}, 1fr)` }}
    >
      {days.map((day, key) => (
        <div key={key} className="flex flex-col gap-4  justify-center">
          <span className="text-xs text-gray-400">{day + 1}</span>
          <div className="h-[calc(100vh-20rem)] w-1 absolute top-52 mt-1 border-r-2 border-dashed border-blue-100"></div>
        </div>
      ))}
    </div>
  );
};

export default DaysColumns;
