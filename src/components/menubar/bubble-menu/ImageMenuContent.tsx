import { Editor } from "@tiptap/react";
import { ALIGNMENT_OPTIONS, type AlignType } from "@/constants/Common";
import { useState, useEffect } from "react";
import SvgIcon from "@/components/common/SvgIcon";
import { Button } from "@/components/base";
import { IMAGE_DEFAULT_WIDTH } from "@/constants/Image";

export const ImageMenuContent = ({ editor }: { editor: Editor }) => {
  const [imageAttrs, setImageAttrs] = useState<{
    align: AlignType;
    width: number;
  }>({
    align: ALIGNMENT_OPTIONS.LEFT,
    width: IMAGE_DEFAULT_WIDTH,
  });

  // Alignment button configurations
  const ALIGNMENT_BUTTONS = [
    { align: ALIGNMENT_OPTIONS.LEFT, Icon: <SvgIcon name="align-left" />, title: "Align Left" },
    {
      align: ALIGNMENT_OPTIONS.CENTER,
      Icon: <SvgIcon name="align-center" />,
      title: "Align Center",
    },
    {
      align: ALIGNMENT_OPTIONS.RIGHT,
      Icon: <SvgIcon name="align-right" />,
      title: "Align Right",
    },
  ] as const;

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
          align: node.attrs.align || ALIGNMENT_OPTIONS.LEFT,
          width: node.attrs.width || IMAGE_DEFAULT_WIDTH,
        };
      }
      return { align: ALIGNMENT_OPTIONS.LEFT, width: IMAGE_DEFAULT_WIDTH };
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
      className="flex gap-1 bg-white p-1 rounded-md shadow-lg border border-neutral-200"
      onMouseDown={(e) => e.preventDefault()}
    >
      {ALIGNMENT_BUTTONS.map(({ align: btnAlign, Icon, title }) => (
        <Button
          key={btnAlign}
          onClick={() => handleAlignChange(btnAlign)}
          title={title}
          active={btnAlign === currentAlign}
        >
          {Icon}
        </Button>
      ))}
    </div>
  );
};
