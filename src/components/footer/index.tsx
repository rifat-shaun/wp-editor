import { FOOTER_HEIGHT } from "../../constants";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "../../hooks/useTiptapEditorState";

export const Footer = ({ editor }: { editor: Editor }) => {
  const { characterCount, wordCount } = useTiptapEditorState(editor);

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-0.5"
      style={{ height: `${FOOTER_HEIGHT}px` }}
    >
      <div className="flex gap-4 text-sm text-neutral-600">
        <span>Characters: {characterCount}</span>
        <span>Words: {wordCount}</span>
      </div>
      <div>Toolbar</div>
    </div>
  );
};
