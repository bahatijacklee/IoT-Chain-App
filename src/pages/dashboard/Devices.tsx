import DeviceRegistration from "@/components/dashboard/DeviceRegistration";
import DeviceGrid from "@/components/dashboard/DeviceGrid";

const Devices = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-none">
        <DeviceRegistration />
      </div>
      <div className="flex-grow">
        <DeviceGrid />
      </div>
    </div>
  );
};

export default Devices;
