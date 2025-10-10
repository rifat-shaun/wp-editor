import { useEditorShell } from "@/contexts/EditorShellContext";
import { useTiptapEditorState } from "./useTiptapEditorState";

export const useFontStyleMethods = () => {
  const { editor } = useEditorShell();
  const { fontSize, isSubscript, isSuperscript } = useTiptapEditorState();

  if (!editor) {
    return {
      handleFontFamilyChange: () => {},
      handleFontSizeChange: () => {},
      increaseFontSize: () => {},
      decreaseFontSize: () => {},
      handleSuperscriptToggle: () => {},
      handleSubscriptToggle: () => {},
      handleToggleBold: () => {},
      handleToggleItalic: () => {},
      handleToggleUnderline: () => {},
      handleToggleStrike: () => {},
      handleSetColor: (_color: string) => {},
      handleUnsetColor: () => {},
      handleSetBackgroundColor: (_color: string) => {},
      handleUnsetBackgroundColor: () => {},
      handleSetHighlightColor: (_color: string) => {},
      handleUnsetHighlightColor: () => {},
      isEditable: false
    };
  }

  const handleFontFamilyChange = (fontFamily: string) => {
    if (
      editor?.commands?.setFontFamily as unknown as (
        _fontFamily: string
      ) => void
    ) {
      editor.chain().focus().setFontFamily(fontFamily).run();
    }
  };

  const handleFontSizeChange = (size: number | null) => {
    if (!size) return;

    editor
      .chain()
      .focus()
      .setFontSize(String(size + "pt"))
      .run();
  };

  const increaseFontSize = () => {
    const currentSize = fontSize;
    if (currentSize) {
      if (!isNaN(currentSize)) {
        const newSize = currentSize + 1;

        editor
          .chain()
          .focus()
          .setFontSize(newSize + "pt")
          .run();
      }
    }
  };

  const decreaseFontSize = () => {
    const currentSize = fontSize;
    if (currentSize) {
      if (!isNaN(currentSize) && currentSize > 1) {
        const newSize = currentSize - 1;

        editor
          .chain()
          .focus()
          .setFontSize(newSize + "pt")
          .run();
      }
    }
  };

  const handleSuperscriptToggle = () => {
    if (isSubscript) {
      editor.chain().focus().unsetSubscript().run();
    }

    editor.chain().focus().toggleSuperscript().run();
  };

  const handleSubscriptToggle = () => {
    if (isSuperscript) {
      editor.chain().focus().unsetSuperscript().run();
    }

    editor.chain().focus().toggleSubscript().run();
  };

  const handleToggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleToggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleToggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const handleToggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const handleSetColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const handleUnsetColor = () => {
    editor.chain().focus().unsetColor().run();
  };

  const handleSetBackgroundColor = (color: string) => {
    editor.chain().focus().setBackgroundColor(color).run();
  };

  const handleUnsetBackgroundColor = () => {
    editor.chain().focus().unsetBackgroundColor().run();
  };

  const handleSetHighlightColor = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run()
  };

  const handleUnsetHighlightColor = () => {
    editor.chain().focus().unsetHighlight().run();
  };
  const isEditable = editor.isEditable;

  return {
    handleFontFamilyChange,
    handleFontSizeChange,
    increaseFontSize,
    decreaseFontSize,
    handleSuperscriptToggle,
    handleSubscriptToggle,
    handleToggleBold,
    handleToggleItalic,
    handleToggleUnderline,
    handleToggleStrike,
    handleSetColor,
    handleUnsetColor,
    handleSetBackgroundColor,
    handleUnsetBackgroundColor,
    handleSetHighlightColor,
    handleUnsetHighlightColor,
    isEditable
  };
};
