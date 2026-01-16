import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {/* Animated Rocket */}
        <motion.div
          className="text-6xl text-space-accent mb-8"
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaRocket className="transform -rotate-45" />
        </motion.div>
        
        {/* Loading Text */}
        <motion.h2
          className="font-space text-2xl gradient-text mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          INITIALIZING LAUNCH SEQUENCE
        </motion.h2>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-space-navy rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-space-accent to-space-purple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-space-accent rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                opacity: 0.5,
              }}
              animate={{
                y: -20,
                opacity: [0.5, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
