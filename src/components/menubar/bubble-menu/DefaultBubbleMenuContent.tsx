import { Editor } from "@tiptap/core";
import SvgIcon from "../../common/SvgIcon";
import { useState, useEffect } from "react";

interface DefaultBubbleMenuContentProps {
  editor: Editor;
}

export const DefaultBubbleMenuContent = ({ editor }: DefaultBubbleMenuContentProps) => {
  const [activeStates, setActiveStates] = useState({
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    strike: editor.isActive("strike"),
  });

  // Update active states when editor state changes
  useEffect(() => {
    const updateActiveStates = () => {
      setActiveStates({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
      });
    };

    // Initial update
    updateActiveStates();

    // Listen to editor state changes
    editor.on("transaction", updateActiveStates);
    editor.on("selectionUpdate", updateActiveStates);

    return () => {
      editor.off("transaction", updateActiveStates);
      editor.off("selectionUpdate", updateActiveStates);
    };
  }, [editor]);

  return (
    <div className="flex items-center gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded transition-colors ${
          activeStates.bold
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Bold (Ctrl+B)"
      >
        <SvgIcon name="bold" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded transition-colors ${
          activeStates.italic
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Italic (Ctrl+I)"
      >
        <SvgIcon name="italic" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded transition-colors ${
          activeStates.strike
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Strikethrough"
      >
        <SvgIcon name="strikethrough" />
      </button>

      <div className="w-px h-6 bg-neutral-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="p-2 rounded hover:bg-neutral-100 transition-colors"
        title="Clear formatting"
      >
        <SvgIcon name="clear-format" />
      </button>
    </div>
  );
};
