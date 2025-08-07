import React from "react";
import { TimelineItem } from "../../../types";

interface LaneInputProps {
  name: string;
  setName: (name: string) => void;
  setSelectedLane: (item: TimelineItem | null) => void;
}

const LaneInput: React.FC<LaneInputProps> = ({
  name,
  setName,
  setSelectedLane,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSelectedLane(null);
    }
  };

  return (
    <input
      type="text"
      className="w-full bg-transparent border-none outline-none text-xs font-semibold"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
};

export default LaneInput;
