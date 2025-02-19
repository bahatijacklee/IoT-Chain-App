import React from "react";
import {
  Settings,
  User,
  LogOut,
  LayoutDashboard,
  Cpu,
  BarChart3,
  Shield,
  Wallet,
  Coins,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PinDialog from "./PinDialog";
import NotificationsPanel from "./NotificationsPanel";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  notifications?: number;
}

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notifications = 3,
}: HeaderProps) => {
  const [isPinDialogOpen, setIsPinDialogOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  return (
    <header className="w-full h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="IoT Platform"
            className="w-6 h-6 text-blue-500"
          />
          <h1 className="text-xl font-semibold text-foreground">
            IoT Device Dashboard
          </h1>
        </div>
        <nav className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-16 bg-card border-r border-border flex flex-col items-center py-4 space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Overview</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard/devices"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Cpu className="w-6 h-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Devices</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard/analytics"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <BarChart3 className="w-6 h-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Analytics</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard/rewards"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Coins className="w-6 h-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Rewards</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsPinDialogOpen(true)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Shield className="w-6 h-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Access Control</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard/settings"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="w-6 h-6" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <NotificationsPanel count={notifications} />

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleConnect}
        >
          <Wallet className="h-4 w-4" />
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-start p-4 gap-4 border-b">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{userName}</span>
                <span className="text-sm text-muted-foreground">
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "Not Connected"}
                </span>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Available Rewards
                </span>
                <span className="text-sm font-medium">150 Tokens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Last Claim
                </span>
                <span className="text-sm font-medium">2024-03-20</span>
              </div>
            </div>
            <div className="p-2">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <PinDialog
        isOpen={isPinDialogOpen}
        onClose={() => setIsPinDialogOpen(false)}
      />
    </header>
  );
};

export default Header;
