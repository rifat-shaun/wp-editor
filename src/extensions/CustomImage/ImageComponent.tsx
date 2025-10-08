import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { RESIZE_HANDLES } from "@/constants/Image";
import { useImageResize } from "@/hooks/useImageResize";

type ImageComponentProps = NodeViewProps;

export const ImageComponent: React.FC<ImageComponentProps> = ({
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
      className="custom-image-wrapper"
      style={{
        textAlign: align,
        margin: "1rem 0",
        userSelect: "none",
      }}
    >
      <div style={containerStyle}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            maxWidth: "100%",
          }}
        >
          <img
            ref={imgRef}
            src={src}
            alt={alt || ""}
            title={title || ""}
            style={{
              width: `${currentWidth}px`,
              
              height: "auto",
              display: "block",
              border: selected
                ? "2px solid #3b82f6"
                : "2px solid transparent",
              borderRadius: "4px",
              transition: isResizing ? "none" : "border-color 0.2s",
              cursor: imgCursor,
            }}
            draggable={false}
          />

          {/* Resize Handles */}
          {(selected || isResizing) && (
            <>
              {RESIZE_HANDLES.map((handle) => (
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
