import { Editor } from "@tiptap/react";

export const useParagraphStyleMethods = (editor: Editor) => {
  const handleToggleTaskList = () => {
    if (!editor) return;
    editor.chain().focus().toggleTaskList().run();
  };

  const handleIndentTaskItem = () => {
    if (!editor) return;
    editor.chain().focus().sinkListItem('taskItem').run();
  };

  const handleOutdentTaskItem = () => {
    if (!editor) return;
    editor.chain().focus().liftListItem('taskItem').run();
  };

  return {
    handleToggleTaskList,
    handleIndentTaskItem,
    handleOutdentTaskItem,
  };
};
