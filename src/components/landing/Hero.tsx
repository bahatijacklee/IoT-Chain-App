import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundAnimation from "./BackgroundAnimation";

const Hero = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-950 text-white p-8 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />

      <motion.div
        className="max-w-3xl text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            IoT Device Management Platform
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A powerful platform for managing, monitoring, and analyzing your IoT
          devices in real-time.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/dashboard">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            className="bg-gray-800 hover:bg-gray-700 text-white border-0 font-medium"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Floating Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <div className="text-blue-500 mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
            <p className="text-gray-400 text-sm">
              Track your IoT devices with live data updates and instant alerts
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <div className="text-purple-500 mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Data Analytics</h3>
            <p className="text-gray-400 text-sm">
              Powerful analytics tools to visualize and analyze device
              performance
            </p>
          </div>
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <div className="text-green-500 mb-4">🛡️</div>
            <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-400 text-sm">
              Enterprise-grade security with role-based access control
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
