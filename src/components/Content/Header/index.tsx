import MonthSelector from "./MonthSelector";
import TimelineStats from "./TimelineStats";
import DaysColumns from "./DaysColumns";
import { MonthData, LaneArray } from "../../../types";

interface HeaderProps {
  selectedMonthIndex: number;
  setSelectedMonthIndex: (index: number) => void;
  months: (MonthData & { label: string })[];
  lanes: LaneArray;
  days: number[];
}

const Header: React.FC<HeaderProps> = ({
  selectedMonthIndex,
  setSelectedMonthIndex,
  months,
  lanes,
  days,
}) => {
  return (
    <>
    <div className="flex justify-between items-center pt-6">
      <MonthSelector
        selectedMonthIndex={selectedMonthIndex}
        setSelectedMonthIndex={setSelectedMonthIndex}
        months={months}
        />
      <TimelineStats lanes={lanes} />
    </div>
    <DaysColumns days={days} />
        </>
  );
};

export default Header;
