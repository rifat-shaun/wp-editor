import { Editor } from "@tiptap/core";
import SvgIcon from "../../common/SvgIcon";
import { Button } from "../../base/Button";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Popover } from "antd";
import { ParagraphAlignmentOptions } from "@/components/shared/ParagraphAlignmentOptions";
import { BasicFontStyleOptions } from "@/components/shared/BasicFontStyleOptions";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { FontSizeStepper } from "@/components/shared/FontSizeStepper";
import { InsertLinkButton } from "@/components/shared/InsertLinkButton";
import { ClearTextFormatButton } from "@/components/shared/ClearTextFormatButton";

interface DefaultBubbleMenuContentProps {
  editor: Editor;
}

export const DefaultBubbleMenuContent = ({
  editor,
}: DefaultBubbleMenuContentProps) => {
  // Get current alignment for dynamic icon
  const { isTextAlignCenter, isTextAlignRight, isTextAlignJustify } =
    useTiptapEditorState(editor);

  return (
    <div className="flex tems-start gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-1 space-x-1">
      <FontSizeStepper editor={editor} />
      <BasicFontStyleOptions editor={editor} />
      <InsertLinkButton editor={editor} />
      <Popover
        content={
          <div className="flex items-center space-x-2 bg-white">
            <ParagraphAlignmentOptions editor={editor} />
          </div>
        }
        trigger="click"
        arrow={false}
        placement="bottom"
      >
        <Button title="Text Alignment">
          <SvgIcon
            name={
              isTextAlignCenter
                ? "align-center"
                : isTextAlignRight
                  ? "align-right"
                  : isTextAlignJustify
                    ? "align-justify"
                    : "align-left"
            }
            strokeWidth={1.5}
          />
          <ArrowDropDownOutlined
            sx={{ fontSize: "16px", color: "inherit" }}
          />
        </Button>
      </Popover>
      <ClearTextFormatButton editor={editor} />
    </div>
  );
};
