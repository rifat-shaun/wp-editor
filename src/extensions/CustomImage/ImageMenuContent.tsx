import { Editor } from "@tiptap/react";
import { ALIGNMENT_BUTTONS } from "@/constants/Image";
import type { AlignType } from "@/constants/Image";
import { useState, useEffect } from "react";

export const ImageMenuContent = ({ editor }: { editor: Editor }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [imageAttrs, setImageAttrs] = useState<{ align: AlignType; width: number }>({
    align: "left",
    width: 300,
  });

  // Update attributes whenever editor state changes
  useEffect(() => {
    // Get current image attributes from the selected image node
    const getImageAttributes = () => {
      const selection = editor.state.selection as { 
        node?: { 
          type: { name: string }; 
          attrs: { align?: AlignType; width?: number } 
        } 
      };
      const { node } = selection;
      if (node && node.type.name === "image") {
        return {
          align: node.attrs.align || "left" as AlignType,
          width: node.attrs.width || 300,
        };
      }
      return { align: "left" as AlignType, width: 300 };
    };

    const updateAttrs = () => {
      setImageAttrs(getImageAttributes());
    };

    // Initial update
    updateAttrs();

    // Listen to editor transactions (any state change)
    editor.on("transaction", updateAttrs);
    editor.on("selectionUpdate", updateAttrs);

    return () => {
      editor.off("transaction", updateAttrs);
      editor.off("selectionUpdate", updateAttrs);
    };
  }, [editor]);

  const { align: currentAlign, width: currentWidth } = imageAttrs;
  console.log("currentWidth", currentWidth, "currentAlign", currentAlign);

  const handleAlignChange = (newAlign: AlignType) => {
    editor.chain().focus().updateAttributes("image", { align: newAlign }).run();
  };

  const getAlignButtonStyle = (isActive: boolean, isHovered: boolean) => ({
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: isActive
      ? "#3b82f6"
      : isHovered
        ? "#f3f4f6"
        : "transparent",
    color: isActive ? "white" : "#374151",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    outline: "none",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        backgroundColor: "white",
        padding: "4px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        border: "1px solid #e5e7eb",
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {ALIGNMENT_BUTTONS.map(({ align: btnAlign, Icon, title }) => {
        const isActive = currentAlign === btnAlign;
        const isHovered = hoveredButton === btnAlign;
        return (
          <button
            key={btnAlign}
            onClick={() => handleAlignChange(btnAlign)}
            style={getAlignButtonStyle(isActive, isHovered)}
            onMouseEnter={() => setHoveredButton(btnAlign)}
            onMouseLeave={() => setHoveredButton(null)}
            title={title}
          >
            <Icon sx={{ fontSize: 18 }} />
          </button>
        );
      })}
    </div>
  );
};
