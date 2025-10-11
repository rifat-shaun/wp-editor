import SvgIcon from "@/components/common/SvgIcon";
import { useZoom } from "@/hooks/useZoom";
import { usePresentationControl } from "@/hooks/usePresentationControl";
import { Button } from "@/components/base/Button";

interface PresentationControlsProps {
  onPresentationModeToggle: () => void;
  onLaserToggle?: (isActive: boolean) => void;
}

export const PresentationControls = ({ onPresentationModeToggle, onLaserToggle }: PresentationControlsProps) => {
  const { zoomLevel, handleZoomIn, handleZoomOut, handleFitToScreen } = useZoom();
  const {
    isLaserActive,
    laserPosition,
    isControlsVisible,
    handleToggleLaser,
    showControls,
  } = usePresentationControl({ onLaserToggle });

  return (
    <>
      <div
        className="bg-black-700 flex items-center justify-between p-2 rounded-lg absolute w-80 h-12 bottom-2 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
        style={{
          opacity: isControlsVisible ? 1 : 0,
          transform: `translate(-50%, ${isControlsVisible ? '0' : '100%'})`,
          pointerEvents: isControlsVisible ? 'auto' : 'none'
        }}
        onMouseEnter={showControls}
      >
        <Button onClick={handleZoomOut} className="flex items-center justify-center !p-2 !bg-transparent hover:!bg-white/10 !text-white" title="Zoom Out">
          <SvgIcon name="minus" size={20} className="text-white" strokeWidth={3.5} />
        </Button>

        <span className="text-xs text-white">{zoomLevel}%</span>

        <Button onClick={handleZoomIn} className="flex items-center justify-center !p-2 !bg-transparent hover:!bg-white/10 !text-white" title="Zoom In">
          <SvgIcon name="plus" size={20} className="text-white" strokeWidth={3.5} />
        </Button>

        <div className="h-6 w-px bg-white/30" />

        <Button onClick={handleFitToScreen} className="flex items-center justify-center !p-2 !bg-transparent hover:!bg-white/10 !text-white" active={zoomLevel === 100} title="Fit to Screen">
          <SvgIcon name="auto-width" size={20} className="text-white" strokeWidth={3.5} />
        </Button>

        <Button
          onClick={handleToggleLaser}
          className="flex items-center justify-center !p-2 !bg-transparent hover:!bg-white/10 !text-white"
          active={isLaserActive}
          title="Laser Pointer"
        >
          <SvgIcon name="laser-pointer" size={20} className="text-white" strokeWidth={3.5} />
        </Button>

        <div className="h-6 w-px bg-white/30" />

        <Button onClick={onPresentationModeToggle} className="flex items-center justify-center !p-2 !bg-transparent hover:!bg-red-500/20 !text-white" title="Exit Presentation">
          <SvgIcon name="exit" size={20} className="text-white" strokeWidth={3.5} />
        </Button>
      </div>

      <style>{`
        .editor-presentation-mode .editor-content {
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
