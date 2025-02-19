import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  Sun,
  Moon,
  Bell,
  Shield,
  Download,
  Database,
  Coins,
  AlertTriangle,
} from "lucide-react";
import { useContract } from "@/hooks/useContract";
import { useTheme } from "next-themes";
import { useNotifications } from "@/components/ui/notifications";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [autoLogout, setAutoLogout] = React.useState("30");
  const [gasWarning, setGasWarning] = React.useState(true);
  const { notificationsEnabled, setNotificationsEnabled } = useNotifications();
  const [rewardReminders, setRewardReminders] = React.useState(true);
  const [currencyDisplay, setCurrencyDisplay] = React.useState("idc");
  const [isAdmin] = React.useState(true);

  const { contract: rewardsContract } = useContract("TokenRewards");

  const handleExportData = () => {
    // Implementation for exporting data as CSV
    const csvContent =
      "data:text/csv;charset=utf-8,Date,Amount,Transaction\n" +
      "2024-03-20,50,0x1234...\n" +
      "2024-03-19,30,0x5678...\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reward_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* User Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Currency Display</Label>
              <div className="text-sm text-muted-foreground">
                Choose how to display balances
              </div>
            </div>
            <Select value={currencyDisplay} onValueChange={setCurrencyDisplay}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idc">IDC Tokens</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications & Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Transaction Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Get alerts for reward claims and updates
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Gas Fee Alerts</Label>
              <div className="text-sm text-muted-foreground">
                Warning when gas fees are high
              </div>
            </div>
            <Switch checked={gasWarning} onCheckedChange={setGasWarning} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Reward Reminders</Label>
              <div className="text-sm text-muted-foreground">
                Notify when rewards are available
              </div>
            </div>
            <Switch
              checked={rewardReminders}
              onCheckedChange={setRewardReminders}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security & Account */}
      <Card>
        <CardHeader>
          <CardTitle>Security & Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-Logout Timer</Label>
              <div className="text-sm text-muted-foreground">
                Disconnect after inactivity
              </div>
            </div>
            <Select value={autoLogout} onValueChange={setAutoLogout}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Transaction History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
