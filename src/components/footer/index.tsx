import { FOOTER_HEIGHT } from "@/constants";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { useZoom } from "@/hooks/useZoom";
import SvgIcon from "@/components/common/SvgIcon";
import { Button } from "@/components/base";

interface FooterProps {
  editor: Editor;
  onPresentationModeToggle: () => void;
}

export const Footer = ({ editor, onPresentationModeToggle }: FooterProps) => {
  const { characterCount, wordCount } = useTiptapEditorState(editor);
  const { zoomLevel, handleZoomIn, handleZoomOut, handleFitToScreen, handleSetZoom } = useZoom();

  return (
    <>
      <div
        className="flex items-center gap-2 bg-white w-full justify-between px-4 py-0.5 editor-footer"
        style={{ height: `${FOOTER_HEIGHT}px` }}
      >
        <div className="flex gap-4 text-sm text-neutral-600">
          <span>Characters: {characterCount}</span>
          <span>Words: {wordCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleZoomOut}
            title="Zoom Out"
            size="small"
          >
            <SvgIcon name="minus" size={16} strokeWidth={3.5} />
          </Button>

          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={zoomLevel}
            onChange={(e) => handleSetZoom(parseInt(e.target.value))}
            className="w-20 h-1 accent-neutral-700 cursor-pointer"
            title={`${zoomLevel}%`}
          />

          <Button
            onClick={handleZoomIn}
            title="Zoom In"
            size="small"

          >
            <SvgIcon name="plus" size={16} strokeWidth={3.5} />
          </Button>

          <div className="h-6 w-px bg-neutral-300" />

          <Button
            onClick={handleFitToScreen}
            title="Fit to Screen (100%)"
            size="small"

          >
            <SvgIcon name="auto-width" size={16} strokeWidth={3.5} />
          </Button>

          <div className="h-6 w-px bg-neutral-300" />

          <Button
            onClick={onPresentationModeToggle}
            className="flex items-center gap-2 py-px"
            title="Enter Presentation Mode"
            size="small"
          >
            <SvgIcon name="preview" strokeWidth={3.5} />
            <span>Present</span>
          </Button>
        </div>
      </div>

      <style>{`
        .editor-content {
          zoom: ${zoomLevel}%;
          transition: zoom 0.2s ease;
        }
      `}</style>
    </>
  );
};
