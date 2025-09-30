import { Editor } from "@tiptap/core";

interface BubbleMenuContentProps {
  editor: Editor;
}

const BubbleMenuContent = ({ editor }: BubbleMenuContentProps) => {
  return (
    <div className="flex items-center gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1.5 rounded font-semibold transition-colors ${
          editor.isActive("bold")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Bold (Ctrl+B)"
      >
        B
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1.5 rounded font-serif italic transition-colors ${
          editor.isActive("italic")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Italic (Ctrl+I)"
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1.5 rounded line-through transition-colors ${
          editor.isActive("strike")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Strikethrough"
      >
        S
      </button>

      <div className="w-px h-6 bg-neutral-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-3 py-1.5 rounded text-sm hover:bg-neutral-100 transition-colors"
        title="Clear formatting"
      >
        ✕
      </button>
    </div>
  );
};

export default BubbleMenuContent;

