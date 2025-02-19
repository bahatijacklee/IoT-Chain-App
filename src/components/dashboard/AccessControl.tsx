import React from "react";
import { useContract } from "@/hooks/useContract";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield, UserPlus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface AccessControlProps {
  users?: User[];
  onAddUser?: (user: Partial<User>) => void;
  onUpdatePermissions?: (userId: string, permissions: string[]) => void;
}

const AccessControl = ({
  users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      permissions: ["read", "write", "manage"],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Operator",
      permissions: ["read", "write"],
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Viewer",
      permissions: ["read"],
    },
  ],
  onAddUser = async () => {
    const { contract } = useContract("AccessManager");
    if (!contract) return;

    try {
      const tx = await contract.grantRole(address, role);
      await tx.wait();
    } catch (error) {
      console.error("Error granting role:", error);
    }
  },
  onUpdatePermissions = async (userId: string, permissions: string[]) => {
    const { contract } = useContract("AccessManager");
    if (!contract) return;

    try {
      const tx = await contract.updatePermissions(userId, permissions);
      await tx.wait();
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  },
}: AccessControlProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);

  return (
    <Card className="w-full max-w-[800px] h-[500px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold">Access Control</h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input placeholder="Name" />
              </div>
              <div className="space-y-2">
                <Input placeholder="Email" type="email" />
              </div>
              <div className="space-y-2">
                <Input placeholder="Role" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                  onAddUser({
                    name: "New User",
                    email: "new@example.com",
                    role: "Viewer",
                  });
                }}
              >
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${user.role === "Admin" ? "bg-blue-500" : user.role === "Operator" ? "bg-green-500" : "bg-gray-500"} text-white`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {user.permissions.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center gap-2"
                        >
                          <Switch
                            checked={true}
                            onCheckedChange={() =>
                              onUpdatePermissions(user.id, user.permissions)
                            }
                          />
                          <span className="text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>

      {/* Admin Settings */}
      <div className="mt-6 space-y-6">
        <h3 className="text-lg font-semibold">Admin Settings</h3>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Reward Rate (per validation)</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Enter reward amount" />
              <Button variant="secondary">Update</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Slash Percentage</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Enter percentage" />
              <Button variant="secondary">Update</Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Maintenance Mode</Label>
              <div className="text-sm text-muted-foreground">
                Pause claims and registrations
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AccessControl;
