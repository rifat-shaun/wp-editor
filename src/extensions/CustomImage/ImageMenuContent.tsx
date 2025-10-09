import { Editor } from "@tiptap/react";
import { ALIGNMENT_BUTTONS } from "@/constants/Image";
import type { AlignType } from "@/constants/Image";
import { useState, useEffect } from "react";

export const ImageMenuContent = ({ editor }: { editor: Editor }) => {
  const [imageAttrs, setImageAttrs] = useState<{
    align: AlignType;
    width: number;
  }>({
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
          attrs: { align?: AlignType; width?: number };
        };
      };
      const { node } = selection;
      if (node && node.type.name === "image") {
        return {
          align: node.attrs.align || ("left" as AlignType),
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

  const { align: currentAlign } = imageAttrs;

  const handleAlignChange = (newAlign: AlignType) => {
    editor.chain().focus().updateAttributes("image", { align: newAlign }).run();
  };

  return (
    <div
      className="flex gap-[4px] bg-white p-[4px] rounded-lg shadow-lg border border-neutral-200"
      onMouseDown={(e) => e.preventDefault()}
    >
      {ALIGNMENT_BUTTONS.map(({ align: btnAlign, Icon, title }) => {
        const isActive = currentAlign === btnAlign;
        return (
          <button
            key={btnAlign}
            onClick={() => handleAlignChange(btnAlign)}
            className={`flex items-center justify-center p-2 border-none rounded-md ${
              isActive ? "bg-primary-500 text-white" : "hover:bg-neutral-100"
            }
            ${
              isActive ? "text-white" : "text-neutral-700"
            } cursor-pointer transition-all duration-200 outline-none`}
            title={title}
          >
            <Icon sx={{ fontSize: 18 }} />
          </button>
        );
      })}
    </div>
  );
};
