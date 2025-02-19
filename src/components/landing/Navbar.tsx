import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-16 bg-card border-b border-border">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <img
            src="/logo.svg"
            alt="IoT Platform"
            className="w-6 h-6 text-blue-500"
          />
          IoT Platform
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-white">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
