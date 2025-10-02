import { Editor } from "@tiptap/react";

export const useParagraphStyleMethods = (editor: Editor) => {
  const handleToggleTaskList = () => {
    if (!editor) return;
    editor.chain().focus().toggleTaskList().run();
  };

  const handleIndent = () => {
    if (!editor) return;
    
    // Try to indent different list types, otherwise indent paragraph
    if (editor.isActive('taskItem')) {
      editor.chain().focus().sinkListItem('taskItem').run();
    } else if (editor.isActive('listItem')) {
      editor.chain().focus().sinkListItem('listItem').run();
    } else {
      // Use the custom indent command for paragraphs, headings, etc.
      editor.commands.indent();
    }
  };

  const handleOutdent = () => {
    if (!editor) return;
    
    // Try to outdent different list types, otherwise outdent paragraph
    if (editor.isActive('taskItem')) {
      editor.chain().focus().liftListItem('taskItem').run();
    } else if (editor.isActive('listItem')) {
      editor.chain().focus().liftListItem('listItem').run();
    } else {
      // Use the custom outdent command for paragraphs, headings, etc.
      editor.commands.outdent();
    }
  };

  return {
    handleToggleTaskList,
    handleIndent,
    handleOutdent,
  };
};
