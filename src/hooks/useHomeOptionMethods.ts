import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "./useTiptapEditorState";

export const useHomeOptionMethods = (editor: Editor) => {
  const { isAIAutocompletionEnabled } = useTiptapEditorState(editor);

  if (!editor) {
    return {
      handleUndo: () => {},
      handleRedo: () => {},
      handleAIAutocompletion: () => {},
    };
  }

  const handleUndo = () => {
    editor.chain().focus().undo().run();
  };

  const handleRedo = () => {
    editor.chain().focus().redo().run();
  };

  const handleToggleAIAutocompletion = () => {
    isAIAutocompletionEnabled
      ? editor.commands.disableAutocompletion()
      : editor.commands.enableAutocompletion();
  };

  const handleClearFormatting = () => {
    editor.chain().focus().unsetAllMarks().run();
  };

  return {
    handleUndo,
    handleRedo,
    handleToggleAIAutocompletion,
    handleClearFormatting,
  };
};
