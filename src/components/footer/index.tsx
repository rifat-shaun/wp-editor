import { FOOTER_HEIGHT } from "../../constants";
import { Editor } from "@tiptap/react";
import { useTiptapEditorState } from "../../hooks/useTiptapEditorState";
import SvgIcon from "../common/SvgIcon";

interface FooterProps {
  editor: Editor;
  onPresentationModeToggle: () => void;
}

export const Footer = ({ editor, onPresentationModeToggle }: FooterProps) => {
  const { characterCount, wordCount } = useTiptapEditorState(editor);

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-0.5 editor-footer"
      style={{ height: `${FOOTER_HEIGHT}px` }}
    >
      <div className="flex gap-4 text-sm text-neutral-600">
        <span>Characters: {characterCount}</span>
        <span>Words: {wordCount}</span>
      </div>
      
      <button
        onClick={onPresentationModeToggle}
        className="flex items-center gap-2 px-3 py-px text-sm text-neutral-700 hover:bg-neutral-100 rounded transition-colors"
        title="Enter Presentation Mode"
      >
        <SvgIcon name="preview" strokeWidth={3.5} />
        <span>Present</span>
      </button>
    </div>
  );
};
