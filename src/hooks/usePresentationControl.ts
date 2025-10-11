import { useState, useEffect, useRef, useCallback } from "react";

interface UsePresentationControlProps {
  onLaserToggle?: (isActive: boolean) => void;
}

export const usePresentationControl = ({ onLaserToggle }: UsePresentationControlProps = {}) => {
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserPosition, setLaserPosition] = useState({ x: 0, y: 0 });
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggleLaser = useCallback(() => {
    const newLaserState = !isLaserActive;
    setIsLaserActive(newLaserState);
    onLaserToggle?.(newLaserState);
  }, [isLaserActive, onLaserToggle]);

  const showControls = useCallback(() => {
    setIsControlsVisible(true);
    
    // Clear existing timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    
    // Hide controls after 1000ms of inactivity
    hideTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 1000);
  }, []);

  // Track laser pointer position
  useEffect(() => {
    if (!isLaserActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setLaserPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isLaserActive]);

  // Handle mouse movement to show/hide controls
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show controls when mouse is near bottom of screen (within 100px)
      const isNearBottom = window.innerHeight - e.clientY < 100;
      
      if (isNearBottom) {
        showControls();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    
    // Initial auto-hide after 800ms
    showControls();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [showControls]);

  return {
    isLaserActive,
    laserPosition,
    isControlsVisible,
    handleToggleLaser,
    showControls,
  };
};

