import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { ToolbarButtonItem, ItemGroup } from "@/components/toolbar";
import { useInsertOptionMethods } from "@/hooks/useInsertOptionMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { LinkModal } from "./LinkModal";

interface InsertOptionsProps {
  editor: Editor;
}

export const InsertOptions = ({ editor }: InsertOptionsProps) => {
  const { isLinkActive, hasTextSelected, currentLinkUrl } = useTiptapEditorState(editor);
  
  const {
    showLinkInput,
    linkUrl,
    modalPosition,
    handleToggleLink,
    handleSetLink,
    handleCancelLink,
    handleKeyDown,
    handleLinkUrlChange,
  } = useInsertOptionMethods(editor, hasTextSelected, isLinkActive, currentLinkUrl);

  return (
    <>
      <ItemGroup>
        <div className="flex items-center space-x-1">
          <ToolbarButtonItem
            tooltip={
              !hasTextSelected 
                ? "Select text to add link" 
                : isLinkActive 
                  ? "Remove Link" 
                  : "Add Link"
            }
            onClick={handleToggleLink}
            active={isLinkActive}
            disabled={!hasTextSelected}
            size="small"
          >
            <SvgIcon name="link" size={18} />
          </ToolbarButtonItem>
        </div>
      </ItemGroup>

      <LinkModal
        isOpen={showLinkInput}
        position={modalPosition}
        linkUrl={linkUrl}
        onUrlChange={handleLinkUrlChange}
        onKeyDown={handleKeyDown}
        onAdd={handleSetLink}
        onCancel={handleCancelLink}
      />
    </>
  );
};
