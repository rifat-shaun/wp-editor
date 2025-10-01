import { SvgIcon } from "../..";
import { ItemGroup } from "./ItemGroup";
import { ToolbarButtonItem } from "./ToolbarButtonItem";
import { useEditorContext } from "../../contexts/LaxEditorContext";

export const HomeOptions = () => {
  const { editor } = useEditorContext();
  
  return (
    <>
      <ItemGroup>
        <div className="flex items-center space-x-2">
          <ToolbarButtonItem
            tooltip="Undo"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
            active={false}
            size="small"
          >
            <SvgIcon name="undo" />
          </ToolbarButtonItem>

          <ToolbarButtonItem
            tooltip="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
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
