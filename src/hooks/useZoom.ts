import { useState } from "react";

export const useZoom = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleFitToScreen = () => {
    setZoomLevel(100);
  };

  return {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleFitToScreen,
  };
};
