import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Divider, ToolbarButtonItem, ItemGroup } from "@/components/toolbar";
import { Space, Select, InputNumber, Tooltip } from "antd";
import { FONT_SIZE_OPTIONS } from "@/constants/Fonts";

interface HomeOptionsProps {
  editor: Editor;
}

export const HomeOptions = ({ editor }: HomeOptionsProps) => {
  const { canUndo, canRedo, isAIAutocompletionEnabled, fontSize } =
    useTiptapEditorState(editor);

  const handleFontSizeChange = (size: number | null) => {
    if (!size) return;

    editor
      .chain()
      .focus()
      .setFontSize(String(size + "pt"))
      .run();
  };

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

      <Tooltip
        title="Font Size"
        placement="top"
        arrow={false}
        color="black"
        mouseEnterDelay={0.3}
      >
        <Space.Compact className="border border-neutral-300 focus-within:border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded hidden-spin">
          <InputNumber
            value={fontSize}
            onChange={(value) => handleFontSizeChange(value)}
            min={6}
            max={128}
            variant="borderless"
            controls={false}
            size="small"
            rootClassName="w-12 h-5 flex items-center"
          />
          <Select
            value=""
            options={FONT_SIZE_OPTIONS}
            variant="borderless"
            className="w-8 h-5 border-l-2 border-neutral-300 relative"
            styles={{ popup: { root: { width: "60px" } } }}
            onChange={(value) =>
              handleFontSizeChange(value as unknown as number)
            }
          />
        </Space.Compact>
      </Tooltip>
    </>
  );
};
