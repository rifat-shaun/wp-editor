import { motion } from "framer-motion";

type SkeletonLineProps = {
  delay?: number;
  className?: string;
};

export const SkeletonLine = ({ delay = 0, className = "" }: SkeletonLineProps) => {
  return (
    <motion.div
      className={`w-full h-1.5 bg-gray-200 rounded-sm overflow-hidden relative ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    </motion.div>
  );
};

