import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const NotificationContext = React.createContext<
  NotificationContextType | undefined
>(undefined);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const showNotification = React.useCallback(
    (message: string, type: NotificationType = "info") => {
      if (!notificationsEnabled) return;

      toast({
        description: message,
        variant: type === "error" ? "destructive" : "default",
        className: `${
          type === "success"
            ? "bg-green-800"
            : type === "warning"
              ? "bg-yellow-800"
              : type === "error"
                ? "bg-destructive"
                : "bg-gray-800"
        } text-white border-0`,
      });
    },
    [toast, notificationsEnabled],
  );

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        notificationsEnabled,
        setNotificationsEnabled,
      }}
    >
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
