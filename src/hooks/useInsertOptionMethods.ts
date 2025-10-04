import { Editor } from "@tiptap/react";
import { useState, useCallback, useEffect } from "react";

export const useInsertOptionMethods = (editor: Editor, hasTextSelected: boolean, isLinkActive: boolean, currentLinkUrl: string) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const calculateModalPosition = useCallback(() => {
    const { from, to } = editor.state.selection;
    const start = editor.view.coordsAtPos(from);
    const end = editor.view.coordsAtPos(to);
    
    const top = start.top + 20;
    const left = (start.left + end.left) / 2 + 90;
    
    setModalPosition({ top, left });
  }, [editor]);

  const handleToggleLink = useCallback(() => {
    if (!hasTextSelected) {
      return;
    }

    if (isLinkActive) {
      editor.chain().focus().unsetLink().run();
    } else {
      calculateModalPosition();
      setLinkUrl(currentLinkUrl);
      setShowLinkInput(true);
    }
  }, [editor, isLinkActive, currentLinkUrl, hasTextSelected, calculateModalPosition]);

  const handleSetLink = useCallback(() => {
    if (linkUrl && hasTextSelected) {
      const url = linkUrl.startsWith('http://') || linkUrl.startsWith('https://') 
        ? linkUrl 
        : `https://${linkUrl}`;
      
      editor.chain().focus().setLink({ href: url }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  }, [editor, linkUrl, hasTextSelected]);

  const handleCancelLink = useCallback(() => {
    setShowLinkInput(false);
    setLinkUrl("");
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSetLink();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelLink();
    }
  }, [handleSetLink, handleCancelLink]);

  const handleLinkUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
  }, []);

  useEffect(() => {
    if (showLinkInput && !hasTextSelected) {
      setShowLinkInput(false);
      setLinkUrl("");
    }
  }, [showLinkInput, hasTextSelected]);

  return {
    showLinkInput,
    linkUrl,
    modalPosition,
    
    handleToggleLink,
    handleSetLink,
    handleCancelLink,
    handleKeyDown,
    handleLinkUrlChange,
  };
};
