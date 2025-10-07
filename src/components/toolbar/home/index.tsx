import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Divider, ItemGroup } from "@/components/toolbar";
import { Button } from "@/components/base/Button";
import { FontStyleOptions } from "./FontStyleOptions";
import { useHomeOptionMethods } from "@/hooks/useHomeOptionMethods";
import { ParagraphStyleOptions } from "./ParagraphStyleOption";
import { HeadingOptions } from "./HeadingOptions";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";

interface HomeOptionsProps {
  editor: Editor;
}

export const HomeOptions = ({ editor }: HomeOptionsProps) => {
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const { canUndo, canRedo, isAIAutocompletionEnabled } =
    useTiptapEditorState(editor);

  const {
    handleUndo,
    handleRedo,
    handleToggleAIAutocompletion,
    handleClearFormatting,
  } = useHomeOptionMethods(editor);

  return (
    <>
      <ItemGroup>
        <div className="flex items-center space-x-1">
          <Button
            title="Undo"
            onClick={handleUndo}
            disabled={!canUndo}
            active={false}
            size="small"
          >
            <SvgIcon name="undo" strokeWidth={1.5} />
          </Button>

          <Button
            title="Redo"
            onClick={handleRedo}
            disabled={!canRedo}
            active={false}
            size="small"
          >
            <SvgIcon name="redo" strokeWidth={1.5} />
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            title={
              isAIAutocompletionEnabled
                ? "Disable AI Autocompletion"
                : "Enable AI Autocompletion"
            }
            onClick={handleToggleAIAutocompletion}
            active={false}
            size="small"
          >
            {isAIAutocompletionEnabled ? (
              <SvgIcon name="ai-autocompletion" strokeWidth={1.5} />
            ) : (
              <SvgIcon name="ai-autocompletion-exit" strokeWidth={1.5}/>
            )}
          </Button>

          <Button
            title="Clear Formatting"
            onClick={handleClearFormatting}
            active={false}
            size="small"
          >
            <SvgIcon name="clear-format" strokeWidth={1.5} />
          </Button>
        </div>
      </ItemGroup>

      <Divider />

      {isClassicToolbar && <HeadingOptions editor={editor} />}

      <FontStyleOptions editor={editor} />

      <Divider />

      <ParagraphStyleOptions editor={editor} />

      <Divider />

      {!isClassicToolbar && <HeadingOptions editor={editor} />}
    </>
  );
};
