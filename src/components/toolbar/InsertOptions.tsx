import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { ToolbarButtonItem, ItemGroup } from "@/components/toolbar";
import { useInsertOptionMethods } from "@/hooks/useInsertOptionMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { LinkModal } from "./LinkModal";
import { LinkActionsModal } from "./LinkActionsModal";
import { useEffect } from "react";

interface InsertOptionsProps {
  editor: Editor;
}

export const InsertOptions = ({ editor }: InsertOptionsProps) => {
  const { isLinkActive, hasTextSelected, currentLinkUrl } = useTiptapEditorState(editor);
  
  const {
    showLinkInput,
    showLinkActions,
    isEditingLink,
    linkUrl,
    modalPosition,
    handleToggleLink,
    handleSetLink,
    handleCancelLink,
    handleKeyDown,
    handleLinkUrlChange,
    handleLinkActionsModalToggle,
    handleEditLink,
    handleRemoveLink,
    handleCopyLink,
    handleCloseActions,
  } = useInsertOptionMethods(editor, hasTextSelected, isLinkActive, currentLinkUrl);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const linkElement = target.closest('a.editor-link') as HTMLAnchorElement;
      
      if (linkElement) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        handleLinkActionsModalToggle(linkElement.getAttribute('href') || '', event);
        return false;
      }
    };

    const editorElement = editor.view.dom;
    editorElement.addEventListener('click', handleClick, true);

    return () => {
      editorElement.removeEventListener('click', handleClick, true);
    };
  }, [editor, handleLinkActionsModalToggle]);

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
        isEditing={isEditingLink}
        onUrlChange={handleLinkUrlChange}
        onKeyDown={handleKeyDown}
        onAdd={handleSetLink}
        onCancel={handleCancelLink}
      />

      <LinkActionsModal
        isOpen={showLinkActions}
        position={modalPosition}
        linkUrl={linkUrl}
        onEdit={handleEditLink}
        onRemove={handleRemoveLink}
        onCopy={handleCopyLink}
        onClose={handleCloseActions}
      />
    </>
  );
};
