import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Divider, ToolbarButtonItem, ItemGroup } from "@/components/toolbar";
import { FontStyleOptions } from "./FontStyleOptions";

interface HomeOptionsProps {
  editor: Editor;
}

export const HomeOptions = ({ editor }: HomeOptionsProps) => {
  const { canUndo, canRedo, isAIAutocompletionEnabled } =
    useTiptapEditorState(editor);

  return (
    <>
      <ItemGroup>
        <div className="flex items-center space-x-1">
          <ToolbarButtonItem
            tooltip="Undo"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!canUndo}
            active={false}
            size="small"
          >
            <SvgIcon name="undo" size={18} />
          </ToolbarButtonItem>

          <ToolbarButtonItem
            tooltip="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!canRedo}
            active={false}
            size="small"
          >
            <SvgIcon name="redo" size={18} />
          </ToolbarButtonItem>
        </div>

        <div className="flex items-center space-x-1">
          <ToolbarButtonItem
            tooltip={
              isAIAutocompletionEnabled
                ? "Disable AI Autocompletion"
                : "Enable AI Autocompletion"
            }
            onClick={() => {
              isAIAutocompletionEnabled
                ? editor.commands.disableAutocompletion()
                : editor.commands.enableAutocompletion();
            }}
            active={false}
            size="small"
          >
            {isAIAutocompletionEnabled ? (
              <SvgIcon name="ai-autocompletion" size={18} />
            ) : (
              <SvgIcon name="ai-autocompletion-exit" size={18} />
            )}
          </ToolbarButtonItem>

          <ToolbarButtonItem
            tooltip="Clear Formatting"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            active={false}
            size="small"
          >
            <SvgIcon name="clear-format" size={18} />
          </ToolbarButtonItem>
        </div>
      </ItemGroup>

      <Divider />

      <FontStyleOptions editor={editor} />
    </>
  );
};
