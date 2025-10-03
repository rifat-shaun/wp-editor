import Document from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extensions";
import Typography from "@tiptap/extension-typography";
import { OrderedListWithType } from "./OrderedListWithType";
import {
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { AIAutocompletion } from "@/extensions/AIAutoCompletion";
import { OnBlurHighlight } from "./OnBlurHighlight";
import { Indent } from "./Indent";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";

export const EditorExtensions = [
  StarterKit.configure({
    orderedList: false, // Disable default to use our custom one
  }),
  OrderedListWithType,
  Document,
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
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Indent.configure({
    types: ["paragraph", "heading", "blockquote"],
    minLevel: 0,
    maxLevel: 8,
  }),
];
