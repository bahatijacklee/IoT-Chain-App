import React from "react";
import DeviceCard from "./DeviceCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Device {
  deviceId: string;
  status: "online" | "offline" | "error";
  temperature: number;
  location: string;
  lastUpdate: string;
}

interface DeviceGridProps {
  devices?: Device[];
  onSearch?: (searchTerm: string) => void;
}

const DeviceGrid = ({
  devices = [
    {
      deviceId: "DEV-001",
      status: "online",
      temperature: 25.5,
      location: "Warehouse A",
      lastUpdate: "2 minutes ago",
    },
    {
      deviceId: "DEV-002",
      status: "offline",
      temperature: 22.0,
      location: "Warehouse B",
      lastUpdate: "1 hour ago",
    },
    {
      deviceId: "DEV-003",
      status: "error",
      temperature: 30.2,
      location: "Warehouse C",
      lastUpdate: "5 minutes ago",
    },
  ],
  onSearch = () => {},
}: DeviceGridProps) => {
  return (
    <div className="w-full h-full bg-background p-6 rounded-lg">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search devices..."
          className="pl-10 bg-muted text-foreground border-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ScrollArea className="h-[calc(100%-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.deviceId}
              deviceId={device.deviceId}
              status={device.status}
              temperature={device.temperature}
              location={device.location}
              lastUpdate={device.lastUpdate}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DeviceGrid;
