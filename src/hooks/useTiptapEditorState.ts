import { Editor, useEditorState } from "@tiptap/react";

export const useTiptapEditorState = (editor: Editor) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canSuperscript:
          ctx.editor.can().chain().toggleSuperscript().run() ?? false,
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        canSubscript: ctx.editor.can().chain().toggleSubscript().run() ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        selectionColor:
          ctx.editor.getAttributes("textStyle")?.color ?? "#000000",
        selectionBackgroundColor:
          ctx.editor.getAttributes("textStyle")?.backgroundColor ?? "#FFFFFF",
        characterCount: ctx.editor.storage.characterCount?.characters?.() ?? 0,
        wordCount: ctx.editor.storage.characterCount?.words?.() ?? 0,
        isAIAutocompletionEnabled:
          ctx.editor.storage.aiAutoCompletion.isEnabled ?? false,
        fontSize: parseInt(
          ctx.editor
            .getAttributes("textStyle")
            ?.fontSize?.replace(/px|pt/, "") ?? "12",
          10
        ),
        fontFamily:
          ctx.editor.getAttributes("textStyle")?.fontFamily ??
          "Arial, sans-serif",
      };
    },
  });

  return editorState;
};
