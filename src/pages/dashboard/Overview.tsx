import DeviceGrid from "@/components/dashboard/DeviceGrid";
import RewardWidget from "@/components/dashboard/RewardWidget";
import DataVisualization from "@/components/dashboard/DataVisualization";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-grow">
          <DeviceGrid />
        </div>
        <div className="flex-none">
          <RewardWidget />
        </div>
      </div>
      <DataVisualization />
    </div>
  );
};

export default Overview;
