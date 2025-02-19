import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, MapPin, Clock, Activity } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeviceCardProps {
  deviceId?: string;
  status?: "online" | "offline" | "error";
  temperature?: number;
  location?: string;
  lastUpdate?: string;
  validationScore?: number;
}

const DeviceCard = ({
  deviceId = "DEV-001",
  status = "online",
  temperature = 25.5,
  location = "Warehouse A",
  lastUpdate = "2 minutes ago",
  validationScore = 95,
}: DeviceCardProps) => {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    error: "bg-red-500",
  };

  return (
    <Card className="w-[300px] h-[200px] bg-card text-card-foreground hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{deviceId}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className={`${statusColors[status]} text-white`}
                >
                  <Activity className="w-4 h-4 mr-1" />
                  {status}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Device Status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-blue-400" />
            <span>{temperature}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last update: {lastUpdate}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">Validation Score:</div>
            <div
              className={`text-sm font-medium ${validationScore >= 90 ? "text-green-400" : validationScore >= 70 ? "text-yellow-400" : "text-red-400"}`}
            >
              {validationScore}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
