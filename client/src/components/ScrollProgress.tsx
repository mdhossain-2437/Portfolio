import { useEffect, useState, memo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress component - Shows a progress bar at the top of the page
 * that indicates how far the user has scrolled down the page
 */
export default memo(function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Use spring physics for smooth animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Hide the progress bar when at the top of the page
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      setIsVisible(value > 0.01);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/50 z-50 origin-left"
      style={{ 
        scaleX, 
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s"
      }}
    />
  );
});