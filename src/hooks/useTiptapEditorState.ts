import { Editor, getMarkAttributes, useEditorState } from "@tiptap/react";

export const useTiptapEditorState = (editor: Editor) => {
  if (!editor) {
    return {
      canUndo: false,
      canRedo: false,
      isBold: false,
      canBold: false,
      isItalic: false,
      canItalic: false,
      isStrike: false,
      canStrike: false,
      isUnderline: false,
      canUnderline: false,
      isSuperscript: false,
      canSuperscript: false,
      isSubscript: false,
      canSubscript: false,
      selectionColor: "#000000",
      selectionBackgroundColor: "#FFFFFF",
      highlightColor: "#FFFFFF",
      fontSize: 12,
      fontFamily: "Arial, sans-serif",
      characterCount: 0,
      wordCount: 0,
      isAIAutocompletionEnabled: false,
      isTaskList: false,
      canIndent: false,
      canOutdent: false,
      isOrderedList: false,
      currentOrderedListType: "decimal",
      isUnorderedList: false,
      currentUnorderedListType: "disc",
      isTextAlignJustify: false,
      isTextAlignCenter: false,
      isTextAlignRight: false,
      isTextAlignLeft: false,
      isBlockquote: false,
      canBlockquote: false,
      selectionHeadingLevel: "paragraph",
    };
  }

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        // Undo and Redo
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,

        // Bold
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,

        // Italic
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,

        // Strike
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,

        // Underline
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,

        // Superscript and Subscript
        isSuperscript: ctx.editor.isActive("superscript") ?? false,
        canSuperscript:
          ctx.editor.can().chain().toggleSuperscript().run() ?? false,
        isSubscript: ctx.editor.isActive("subscript") ?? false,
        canSubscript: ctx.editor.can().chain().toggleSubscript().run() ?? false,

        // Selection Color
        selectionColor:
          ctx.editor.getAttributes("textStyle")?.color ?? "#000000",
        selectionBackgroundColor:
          ctx.editor.getAttributes("textStyle")?.backgroundColor ?? "#FFFFFF",

        // Highlight Color
        highlightColor:
          getMarkAttributes(ctx.editor.state, "highlight")?.color ?? "#FFFFFF",

        // Font Size and Family
        fontSize: parseInt(
          ctx.editor
            .getAttributes("textStyle")
            ?.fontSize?.replace(/px|pt/, "") ?? "12",
          10
        ),
        fontFamily:
          ctx.editor.getAttributes("textStyle")?.fontFamily ??
          "Arial, sans-serif",

        // Character and Word Count
        characterCount: ctx.editor.storage.characterCount?.characters?.() ?? 0,
        wordCount: ctx.editor.storage.characterCount?.words?.() ?? 0,

        // AI Autocompletion
        isAIAutocompletionEnabled:
          ctx.editor.storage.aiAutoCompletion.isEnabled ?? false,

        // Task List
        isTaskList: ctx.editor.isActive("taskList") ?? false,

        // Indentation (works for lists and paragraphs)
        canIndent:
          ctx.editor.can().sinkListItem("taskItem") ||
          ctx.editor.can().sinkListItem("listItem") ||
          ctx.editor.can().indent(),
        canOutdent:
          ctx.editor.can().liftListItem("taskItem") ||
          ctx.editor.can().liftListItem("listItem") ||
          ctx.editor.can().outdent(),

        //List
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        currentOrderedListType:
          ctx.editor.getAttributes("orderedList")?.listType ?? "decimal",
        isUnorderedList: ctx.editor.isActive("bulletList") ?? false,
        currentUnorderedListType:
          ctx.editor.getAttributes("bulletList")?.listType ?? "disc",

        // Text Align
        isTextAlignJustify:
          ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        isTextAlignCenter:
          ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isTextAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isTextAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,

        // Blockquote
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canBlockquote: ctx.editor.can().chain().toggleBlockquote().run() ?? false,

        // Heading
        selectionHeadingLevel: ctx.editor.getAttributes("heading")?.level ?? "paragraph",
      };
    },
  });

  return editorState;
};
