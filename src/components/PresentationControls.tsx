import { useState, useEffect } from "react";
import SvgIcon from "./common/SvgIcon";
import { useZoom } from "../hooks/useZoom";

interface PresentationControlsProps {
  onExit: () => void;
  onLaserToggle?: (isActive: boolean) => void;
}

export const PresentationControls = ({ onExit, onLaserToggle }: PresentationControlsProps) => {
  const { zoomLevel, handleZoomIn, handleZoomOut, handleFitToScreen } = useZoom();
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [laserPosition, setLaserPosition] = useState({ x: 0, y: 0 });

  const handleToggleLaser = () => {
    const newLaserState = !isLaserActive;
    setIsLaserActive(newLaserState);
    onLaserToggle?.(newLaserState);
  };

  useEffect(() => {
    if (!isLaserActive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setLaserPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isLaserActive]);

  const buttonBaseClass = "flex items-center justify-center p-2 bg-transparent hover:bg-white/10 rounded transition-colors text-white border-none cursor-pointer";

  return (
    <>
      <div className="bg-black-700 flex items-center justify-between p-2 rounded-lg absolute w-80 h-12 bottom-2 left-1/2 transform -translate-x-1/2 z-50">
        <button onClick={handleZoomOut} className={buttonBaseClass} title="Zoom Out">
          <SvgIcon name="minus" size={20} className="text-white" strokeWidth={3.5} />
        </button>

        <span className="text-xs text-white">{zoomLevel}%</span>

        <button onClick={handleZoomIn} className={buttonBaseClass} title="Zoom In">
          <SvgIcon name="plus" size={20} className="text-white" strokeWidth={3.5} />
        </button>

        <div className="h-6 w-px bg-white/30" />

        <button onClick={handleFitToScreen} className={`${buttonBaseClass} ${zoomLevel === 100 ? '!bg-neutral-700' : ''}`} title="Fit to Screen">
          <SvgIcon name="auto-width" size={20} className="text-white" strokeWidth={3.5} />
        </button>

        <button
          onClick={handleToggleLaser}
          className={`${buttonBaseClass} ${isLaserActive ? '!bg-neutral-700' : ''}`}
          title="Laser Pointer"
        >
          <SvgIcon name="laser-pointer" size={20} className="text-white" strokeWidth={3.5} />
        </button>

        <div className="h-6 w-px bg-white/30" />

        <button onClick={onExit} className={`${buttonBaseClass} hover:!bg-red-500/20`} title="Exit Presentation">
          <SvgIcon name="exit" size={20} className="text-white" strokeWidth={3.5} />
        </button>
      </div>

      <style>{`
        .lax-presentation-mode .editor-content {
          zoom: ${zoomLevel}%;
          transition: zoom 0.2s ease;
        }
      `}</style>

      {isLaserActive && (
        <div
          className="editor-laser-pointer"
          style={{
            left: `${laserPosition.x}px`,
            top: `${laserPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </>
  );
};
