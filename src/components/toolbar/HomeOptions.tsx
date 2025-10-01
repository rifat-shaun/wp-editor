import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Divider, ToolbarButtonItem, ItemGroup } from "@/components/toolbar";

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
            <SvgIcon name="undo" />
          </ToolbarButtonItem>

          <ToolbarButtonItem
            tooltip="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!canRedo}
            active={false}
            size="small"
          >
            <SvgIcon name="redo" />
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
              console.log("toggleAutocompletion = ", isAIAutocompletionEnabled);
              isAIAutocompletionEnabled
                ? editor.commands.disableAutocompletion()
                : editor.commands.enableAutocompletion();
            }}
            active={false}
            size="small"
          >
            {isAIAutocompletionEnabled ? (
              <SvgIcon name="ai-autocompletion" />
            ) : (
              <SvgIcon name="ai-autocompletion-exit" />
            )}
          </ToolbarButtonItem>

          <ToolbarButtonItem
            tooltip="Clear Formatting"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            active={false}
            size="small"
          >
            <SvgIcon name="clear-format" />
          </ToolbarButtonItem>
        </div>
      </ItemGroup>

      <Divider />
    </>
  );
};
