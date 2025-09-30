import { Editor } from "@tiptap/core";
import SvgIcon from "../common/SvgIcon";

interface BubbleMenuContentProps {
  editor: Editor;
}

const BubbleMenuContent = ({ editor }: BubbleMenuContentProps) => {
  return (
    <div className="flex items-center gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded transition-colors ${
          editor.isActive("bold")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Bold (Ctrl+B)"
      >
        <SvgIcon name="bold"  />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded transition-colors ${
          editor.isActive("italic")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Italic (Ctrl+I)"
      >
        <SvgIcon name="italic"  />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded transition-colors ${
          editor.isActive("strike")
            ? "bg-primary-100 text-primary-700"
            : "hover:bg-neutral-100"
        }`}
        title="Strikethrough"
      >
        <SvgIcon name="strike"  />
      </button>

      <div className="w-px h-6 bg-neutral-300 mx-1" />

      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="p-2 rounded hover:bg-neutral-100 transition-colors"
        title="Clear formatting"
      >
        <SvgIcon name="clear-format"  />
      </button>
    </div>
  );
};

export default BubbleMenuContent;

