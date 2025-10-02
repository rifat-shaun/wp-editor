import { Editor } from "@tiptap/react";

export const useParagraphStyleMethods = (editor: Editor) => {
  if (!editor) {
    return {
      handleToggleTaskList: () => {},
    };
  }

  const handleToggleTaskList = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  return {
    handleToggleTaskList,
  };
};
