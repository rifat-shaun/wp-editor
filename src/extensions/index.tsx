import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extensions";
import Typography from '@tiptap/extension-typography';
import { TextStyle, FontSize } from '@tiptap/extension-text-style';
import { AIAutocompletion } from "@/extensions/AIAutoCompletion";

export const EditorExtensions = [
  StarterKit,
  CharacterCount,
  Placeholder.configure({
    placeholder: "Write something …",
  }),
  Typography.configure({
    oneHalf: false,
    oneQuarter: false,
    threeQuarters: false,
  }),
  TextStyle,
  FontSize,
  AIAutocompletion,
];
