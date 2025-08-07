import React from "react";

interface LaneDurationBarProps {
  durationInDays: number;
}

const LaneDurationBar: React.FC<LaneDurationBarProps> = ({ durationInDays }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b">
      <div 
        className="h-full bg-current opacity-30 rounded-b"
        style={{ 
          width: `${Math.min(100, (durationInDays / 31) * 100)}%` 
        }}
      ></div>
    </div>
  );
};

export default LaneDurationBar;
