import React from "react";
import { useContract } from "@/hooks/useContract";
import { useNotifications } from "@/components/ui/notifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DeviceRegistrationProps {
  onSubmit?: (data: DeviceFormData) => void;
  isLoading?: boolean;
}

const deviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required"),
  deviceType: z.string().min(1, "Device type is required"),
  location: z.string().min(1, "Location is required"),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

const DeviceRegistration = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  isLoading = false,
}: DeviceRegistrationProps) => {
  const { showNotification } = useNotifications();
  const form = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      deviceId: "",
      deviceType: "",
      location: "",
    },
  });

  const { contract } = useContract("DeviceRegistry");

  const handleSubmit = async (data: DeviceFormData) => {
    try {
      if (!contract) throw new Error("Contract not initialized");

      const tx = await contract.registerDevice(
        data.deviceId,
        data.deviceType,
        data.location,
      );
      await tx.wait();
      showNotification("Device registered successfully!", "success");
      onSubmit(data);
    } catch (error) {
      console.error("Error registering device:", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Register New Device</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="deviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter device ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sensor">Sensor</SelectItem>
                      <SelectItem value="actuator">Actuator</SelectItem>
                      <SelectItem value="gateway">Gateway</SelectItem>
                      <SelectItem value="controller">Controller</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter device location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => form.reset()}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Device"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeviceRegistration;
