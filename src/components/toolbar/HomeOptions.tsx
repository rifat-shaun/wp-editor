import { SvgIcon } from "../..";
import { ItemGroup } from "./ItemGroup";
import { ToolbarButtonItem } from "./ToolbarButtonItem";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "../../hooks/useTiptapEditorState";

interface HomeOptionsProps {
  editor: Editor;
}

export const HomeOptions = ({ editor }: HomeOptionsProps) => {
  const { canUndo, canRedo } = useTiptapEditorState(editor);

  return (
    <>
      <ItemGroup>
        <div className="flex items-center space-x-2">
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
      </ItemGroup>
    </>
  );
};
