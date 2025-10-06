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

  const handleSetZoom = (value: number) => {
    setZoomLevel(Math.min(Math.max(value, 50), 200));
  };

  return {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleFitToScreen,
    handleSetZoom,
  };
};
