import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { RESIZE_CURSOR_POSITION_OPTIONS } from "@/constants/Image";
import { useImageResize } from "@/hooks/useImageResize";

type ImageNodeProps = NodeViewProps;

export const ImageNode: React.FC<ImageNodeProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const { src, alt, title } = node.attrs;

  const {
    imgRef,
    isResizing,
    currentWidth,
    align,
    imgCursor,
    containerStyle,
    handleMouseDown,
    getHandleStyle,
  } = useImageResize({ node, updateAttributes });

  return (
    <NodeViewWrapper
      style={{
        width: currentWidth,
      }}
      className={`w-fit max-w-full my-4 ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
        }`}
    >
      <div style={containerStyle}>
        <div className="relative inline-block">
          <img
            ref={imgRef}
            src={src}
            alt={alt || ""}
            title={title || ""}
            className={`w-[${currentWidth}px] h-auto block ${selected
              ? "border-2 border-blue-500"
              : "border-2 border-transparent"
              } 
            rounded-[4px] ${isResizing
                ? "border-none"
                : "transition-border-color duration-200"
              } cursor-${imgCursor}`}
            draggable={false}
          />

          {/* Resize Handles */}
          {(selected || isResizing) && (
            <>
              {Object.values(RESIZE_CURSOR_POSITION_OPTIONS).map((handle) => (
                <div
                  key={handle}
                  onMouseDown={(e) => handleMouseDown(e, handle)}
                  style={getHandleStyle(handle)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
};
