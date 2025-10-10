import { useTiptapEditorState } from "./useTiptapEditorState";
import { useEditorShell } from "@/contexts/EditorShellContext";

export const useHomeOptionMethods = () => {
  const { editor } = useEditorShell();
  const { isAIAutocompletionEnabled } = useTiptapEditorState();

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
    if (isAIAutocompletionEnabled) {
      editor.commands.disableAutocompletion();
    } else {
      editor.commands.enableAutocompletion();
    }
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
