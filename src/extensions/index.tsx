import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extensions";

export const EditorExtensions = [
  StarterKit,
  CharacterCount,
  Placeholder.configure({
    placeholder: "Write something …",
  }),
];
