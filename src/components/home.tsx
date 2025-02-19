import React from "react";
import Header from "./dashboard/Header";
import DeviceRegistration from "./dashboard/DeviceRegistration";
import DeviceGrid from "./dashboard/DeviceGrid";
import DataVisualization from "./dashboard/DataVisualization";
import AccessControl from "./dashboard/AccessControl";
import RewardWidget from "./dashboard/RewardWidget";

interface HomeProps {
  isAdmin?: boolean;
}

const Home = ({ isAdmin = true }: HomeProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-none">
            <DeviceRegistration />
          </div>
          <div className="flex-grow">
            <DeviceGrid />
          </div>
          <div className="flex-none">
            <RewardWidget />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-grow">
            <DataVisualization />
          </div>
          {isAdmin && (
            <div className="flex-none">
              <AccessControl />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
