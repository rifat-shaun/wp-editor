import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

export const useCharacterCount = (editor: Editor | null) => {
  const [words, setWords] = useState(0);
  const [characters, setCharacters] = useState(0);

  useEffect(() => {
    if (!editor) return;

    // Initial values
    setWords(editor.storage.characterCount?.words?.() ?? 0);
    setCharacters(editor.storage.characterCount?.characters?.() ?? 0);

    // Update on editor changes
    const updateCounts = () => {
      setWords(editor.storage.characterCount?.words?.() ?? 0);
      setCharacters(editor.storage.characterCount?.characters?.() ?? 0);
    };

    editor.on("update", updateCounts);

    return () => {
      editor.off("update", updateCounts);
    };
  }, [editor]);

  return { words, characters };
};

