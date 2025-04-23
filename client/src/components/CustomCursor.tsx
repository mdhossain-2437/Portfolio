import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

/**
 * CustomCursor component creates a unique cursor effect that follows 
 * the mouse with a smooth animation and special hover effects
 */
export default memo(function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      // Track cursor position
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        if (!isVisible) {
          setIsVisible(true);
        }
      };

      // Track click state
      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);
      
      // Track hover over interactive elements
      const handleLinkHoverStart = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.closest('a') || 
          target.closest('button') ||
          target.hasAttribute('data-cursor-hover') ||
          target.closest('[data-cursor-hover]')
        ) {
          setIsHoveringLink(true);
        }
      };
      
      const handleLinkHoverEnd = () => {
        setIsHoveringLink(false);
      };
      
      // Hide cursor when leaving the window
      const handleMouseLeave = () => {
        setIsVisible(false);
      };
      
      // Add event listeners
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handleLinkHoverStart);
      document.addEventListener('mouseout', handleLinkHoverEnd);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      // Remove default cursor from body
      document.body.style.cursor = 'none';
      
      // Add custom styles to standard interactive elements
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        a, button, [data-cursor-hover], select, input[type=submit], input[type=button] {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleSheet);
      
      // Cleanup
      return () => {
        document.removeEventListener('mousemove', updatePosition);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseover', handleLinkHoverStart);
        document.removeEventListener('mouseout', handleLinkHoverEnd);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.body.style.cursor = 'auto';
        document.head.removeChild(styleSheet);
      };
    }
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="cursor-container" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, top: 0, left: 0 }}>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 0.7 : isHoveringLink ? 0.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.5
        }}
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'rgba(var(--primary-rgb), 0.9)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.6)'
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHoveringLink ? 1.5 : isClicking ? 0.9 : 1,
          opacity: isVisible ? (isHoveringLink ? 0.6 : 0.3) : 0,
          borderColor: isHoveringLink ? 'rgba(var(--primary-rgb), 0.8)' : 'rgba(255, 255, 255, 0.5)'
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 150,
          mass: 1,
          delay: 0.01
        }}
        style={{
          position: 'absolute',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          backdropFilter: 'blur(1px)'
        }}
      />
      
      {/* Glow effect for hover state */}
      {isHoveringLink && (
        <motion.div
          className="cursor-glow"
          animate={{
            x: position.x,
            y: position.y,
            opacity: isVisible ? 0.5 : 0
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 150,
            mass: 1
          }}
          style={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform',
            filter: 'blur(10px)'
          }}
        />
      )}
    </div>
  );
});