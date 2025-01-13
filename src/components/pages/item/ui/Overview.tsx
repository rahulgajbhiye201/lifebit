import { HabitData } from "@/lib/indexedDB";
import { CircularProgress } from "@/components/ui/circle-progress";

interface OverviewProps {
  habitData: HabitData | undefined;
}
const Overview: React.FC<OverviewProps> = ({ habitData }) => {
  // If habitData is still loading, return a loading spinner or placeholder
  if (!habitData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center gap-4 space-y-1.5 border border-solid p-6">
      <div className="text-2xl font-semibold tracking-tight">Overview</div>
      <div className="flex flex-row items-center justify-evenly">
        <CircularProgress
          size={48}
          strokeWidth={8}
          value={habitData.timeLine?.length || 0}
          color={habitData.color}
        />
        <div className="flex flex-col">
          {habitData.timeLine?.length || 0}
          <span className="text-muted-foreground">Score</span>
        </div>
        <div className="flex flex-col">
          {habitData.timeLine?.length || 0}
          <span className="text-muted-foreground">Month</span>
        </div>
        <div className="flex flex-col">
          {habitData.timeLine?.length || 0}
          <span className="text-muted-foreground">Year</span>
        </div>
        <div className="flex flex-col">
          {habitData.timeLine?.length || 0}
          <span className="text-muted-foreground">Total</span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
