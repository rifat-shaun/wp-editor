import { Editor } from "@tiptap/react";
import { useState, useCallback } from "react";
import { useTiptapEditorState } from "./useTiptapEditorState";

export const useInsertOptionMethods = (editor: Editor) => {
  const { hasTextSelected, isLinkActive, currentLinkUrl } =
    useTiptapEditorState(editor);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showLinkActions, setShowLinkActions] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);
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

  const handleToggleAddLinkModal = useCallback(() => {
    if (!hasTextSelected) {
      return;
    }

    if (isLinkActive) {
      editor.chain().focus().unsetLink().run();
    } else {
      calculateModalPosition();
      setLinkUrl(currentLinkUrl);
      setIsEditingLink(false);
      setShowLinkInput(true);
    }
  }, [
    editor,
    isLinkActive,
    currentLinkUrl,
    hasTextSelected,
    calculateModalPosition,
  ]);

  const handleSetLink = useCallback(() => {
    if (linkUrl && hasTextSelected) {
      const url =
        linkUrl.startsWith("http://") || linkUrl.startsWith("https://")
          ? linkUrl
          : `https://${linkUrl}`;

      editor.chain().focus().setLink({ href: url }).run();
    }
    setShowLinkInput(false);
    setIsEditingLink(false);
    setLinkUrl("");
  }, [editor, linkUrl, hasTextSelected]);

  const handleCancelLink = useCallback(() => {
    setShowLinkInput(false);
    setIsEditingLink(false);
    setLinkUrl("");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSetLink();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancelLink();
      }
    },
    [handleSetLink, handleCancelLink]
  );

  const handleLinkUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLinkUrl(e.target.value);
    },
    []
  );

  const handleLinkActionsModalToggle = useCallback(
    (url: string, event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();

      const top = rect.bottom + window.scrollY + 10;
      const left = rect.left + rect.width / 2 + window.scrollX;

      setModalPosition({ top, left });
      setLinkUrl(url);
      setShowLinkActions(true);
    },
    []
  );

  const handleEditLink = useCallback(() => {
    setShowLinkActions(false);
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    const linkMark = $from.marks().find((mark) => mark.type.name === "link");

    if (linkMark) {
      const start = $from.pos - $from.textOffset;
      let end = start;

      state.doc.nodesBetween(start, state.doc.content.size, (node, pos) => {
        if (
          node.marks.some(
            (mark) =>
              mark.type.name === "link" &&
              mark.attrs.href === linkMark.attrs.href
          )
        ) {
          if (pos >= start) {
            end = Math.max(end, pos + node.nodeSize);
          }
        }
      });

      editor.chain().focus().setTextSelection({ from: start, to: end }).run();
    }

    setIsEditingLink(true);
    setShowLinkInput(true);
  }, [editor]);

  const handleRemoveLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setShowLinkActions(false);
    setLinkUrl("");
  }, [editor]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(linkUrl);
  }, [linkUrl]);

  const handleCloseActions = useCallback(() => {
    setShowLinkActions(false);
    setLinkUrl("");
  }, []);

  return {
    showLinkInput,
    showLinkActions,
    isEditingLink,
    linkUrl,
    modalPosition,
    hasTextSelected,
    isLinkActive,

    handleToggleAddLinkModal,
    handleSetLink,
    handleCancelLink,
    handleKeyDown,
    handleLinkUrlChange,
    handleLinkActionsModalToggle,
    handleEditLink,
    handleRemoveLink,
    handleCopyLink,
    handleCloseActions,
  };
};
