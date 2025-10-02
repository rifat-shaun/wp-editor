import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extensions";
import Typography from "@tiptap/extension-typography";
import {
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import { AIAutocompletion } from "@/extensions/AIAutoCompletion";
import { OnBlurHighlight } from "./OnBlurHighlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";

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
  FontFamily,
  AIAutocompletion,
  OnBlurHighlight,
  Superscript,
  Subscript,
  Color,
  BackgroundColor,
  Highlight.configure({
    multicolor: true,
  }),
];
