import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import type { NodeViewProps } from "@tiptap/react";
import {
  HANDLE_CURSORS,
  RESIZE_MULTIPLIERS,
  IMAGE_MIN_WIDTH,
  IMAGE_MAX_WIDTH,
  type ResizeCursorPositionType,
  RESIZE_CURSOR_POSITION_OPTIONS,
} from "@/constants/Image";
import { ALIGNMENT_OPTIONS } from "@/constants/Common";

interface UseImageResizeProps {
  node: NodeViewProps["node"];
  updateAttributes: NodeViewProps["updateAttributes"];
}

export const useImageResize = ({
  node,
  updateAttributes,
}: UseImageResizeProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartY, setResizeStartY] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeHandle, setResizeHandle] = useState<ResizeCursorPositionType | "">("");
  const [currentWidth, setCurrentWidth] = useState(node.attrs.width || 300);

  const { align = "left" } = node.attrs;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: ResizeCursorPositionType) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeHandle(handle);
      setResizeStartX(e.clientX);
      setResizeStartY(e.clientY);
      setResizeStartWidth(currentWidth);
    },
    [currentWidth]
  );

  const containerStyle = useMemo((): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      display: "inline-block",
      position: "relative",
      maxWidth: "100%",
    };

    if (align === ALIGNMENT_OPTIONS.CENTER) {
      return {
        ...baseStyle,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      };
    } else if (align === ALIGNMENT_OPTIONS.RIGHT) {
      return {
        ...baseStyle,
        display: "block",
        marginLeft: "auto",
      };
    }

    return baseStyle;
  }, [align]);

  const imgCursor = useMemo(() => {
    if (!isResizing || !resizeHandle) return "default";
    return HANDLE_CURSORS[resizeHandle as ResizeCursorPositionType];
  }, [isResizing, resizeHandle]);

  const getHandleStyle = useCallback(
    (handle: ResizeCursorPositionType): React.CSSProperties => {
      const positions: Record<ResizeCursorPositionType, Partial<React.CSSProperties>> = {
        [RESIZE_CURSOR_POSITION_OPTIONS.TOP_LEFT]: { left: "-6px", top: "-6px" },
        [RESIZE_CURSOR_POSITION_OPTIONS.TOP_RIGHT]: { right: "-6px", top: "-6px" },
        [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_LEFT]: { left: "-6px", bottom: "-6px" },
        [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_RIGHT]: { right: "-6px", bottom: "-6px" },
      };

      return {
        position: "absolute",
        ...positions[handle],
        width: "12px",
        height: "12px",
        backgroundColor: "#3b82f6",
        border: "2px solid white",
        borderRadius: "50%",
        cursor: HANDLE_CURSORS[handle],
        zIndex: 10,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      };
    },
    []
  );

  // Sync width from node attributes
  useEffect(() => {
    if (node.attrs.width) {
      setCurrentWidth(node.attrs.width);
    }
  }, [node.attrs.width]);

  // Handle resize mouse events
  useEffect(() => {
    if (!isResizing || !resizeHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      const multiplier = RESIZE_MULTIPLIERS[resizeHandle as ResizeCursorPositionType];
      const diffX = (e.clientX - resizeStartX) * multiplier.x;
      const diffY = (e.clientY - resizeStartY) * multiplier.y;
      const avgDiff = (diffX + diffY) / 2;

      const newWidth = Math.max(
        IMAGE_MIN_WIDTH,
        Math.min(IMAGE_MAX_WIDTH, resizeStartWidth + avgDiff)
      );
      setCurrentWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      updateAttributes({ width: currentWidth });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isResizing,
    resizeStartX,
    resizeStartY,
    resizeStartWidth,
    resizeHandle,
    currentWidth,
    updateAttributes,
  ]);

  return {
    imgRef,
    isResizing,
    currentWidth,
    align,
    imgCursor,
    containerStyle,
    handleMouseDown,
    getHandleStyle,
  };
};

