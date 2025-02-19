import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "transaction" | "reward" | "device" | "system";
  read: boolean;
}

interface NotificationsPanelProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  count?: number;
}

const NotificationsPanel = ({
  notifications = [
    {
      id: "1",
      title: "Reward Claimed",
      message: "Successfully claimed 50 tokens",
      timestamp: "2 minutes ago",
      type: "reward",
      read: false,
    },
    {
      id: "2",
      title: "High Gas Fee Alert",
      message: "Current gas price is above threshold",
      timestamp: "5 minutes ago",
      type: "system",
      read: false,
    },
    {
      id: "3",
      title: "Device Update",
      message: "Device DEV-001 is now offline",
      timestamp: "10 minutes ago",
      type: "device",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onClearAll = () => {},
  count = 3,
}: NotificationsPanelProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-card text-card-foreground border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground">Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300"
              onClick={onClearAll}
            >
              Clear All
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${notification.read ? "bg-muted" : "bg-muted/50 border border-border"}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
