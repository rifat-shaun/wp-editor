import { Editor } from "@tiptap/core";
import SvgIcon from "../../common/SvgIcon";
import { Button } from "../../base/Button";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Popover } from "antd";
import { ParagraphAlignOptions } from "@/components/toolbar/home/ParagraphStyleOption";
import { BasicFontStyleOptions } from "@/components/toolbar/home/FontStyleOptions";
import { InsertLinkOptions } from "@/components/toolbar/insert";
import { ArrowDropDownOutlined } from "@mui/icons-material";

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
    <div className="flex tems-start gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
      <BasicFontStyleOptions editor={editor} isBubbleMenu={true} />

      <InsertLinkOptions editor={editor} toolbarType={null} />
      <Popover
        content={
          <div className="p-1 bg-white">
            <ParagraphAlignOptions editor={editor} isBubbleMenu={true} />
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

      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="p-2 rounded hover:bg-neutral-100 transition-colors"
        title="Clear formatting"
      >
        <SvgIcon name="clear-format" />
      </button>
    </div>
  );
};
