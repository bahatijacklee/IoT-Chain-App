import { motion } from "framer-motion";

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Circuit lines */}
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0 100 Q 250 50 500 100 T 1000 100"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 200 Q 250 150 500 200 T 1000 200"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating IoT devices */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            },
          }}
        >
          <div className="w-4 h-4 bg-blue-500/20 rounded-full blur-sm" />
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;
