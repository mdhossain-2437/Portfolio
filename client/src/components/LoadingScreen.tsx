import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import ScrambledText from './ui/scrambled-text';

// A memoized Loading Screen component for better performance
export default memo(function LoadingScreen() {
  const [dots, setDots] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isTextReady, setIsTextReady] = useState(false);

  // Typewriter dots effect
  useEffect(() => {
    // Start scrambled text effect after a short delay
    const textTimeout = setTimeout(() => {
      setIsTextReady(true);
    }, 300);
    
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    // Hide loading screen after 2.5s
    const timeout = setTimeout(() => {
      setIsHidden(true);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      clearTimeout(textTimeout);
    };
  }, []);

  // If hidden, don't render (better than CSS display:none for performance)
  if (isHidden) return null;

  return (
    <div className="loading-screen">
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-clash font-bold text-white mb-4"
        >
          {isTextReady ? (
            <span className="inline-flex items-center">
              <ScrambledText 
                text="Launching Creativity" 
                scrambleDelay={30}
                startDelay={100}
                charSet="!@#$%^&*()_+{}[]<>?/"
              />
              <span className="inline-block w-8 ml-2">{dots}</span>
            </span>
          ) : (
            <span className="opacity-0">Launching Creativity</span>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg text-gray-300"
        >
          A journey from humanities to code
        </motion.div>
      </div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing circle animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-2xl"
        />
        
        {/* Random floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
});