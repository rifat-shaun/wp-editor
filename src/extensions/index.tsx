import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extensions";
import Typography from "@tiptap/extension-typography";
import { OrderedListWithType } from "./OrderedListWithType";
import { UnorderedListWithType } from "./UnorderedListWithType";
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
import { ListItemWithDepthLimit } from "./ListItemWithDepthLimit";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";

export const EditorExtensions = [
  StarterKit.configure({
    orderedList: false, // Disable default to use our custom one
    bulletList: false, // Disable default to use our custom one
    listItem: false, // Disable default to use our custom one with depth limit
  }),
  OrderedListWithType,
  UnorderedListWithType,
  ListItemWithDepthLimit.configure({
    maxDepth: 9, // Maximum nesting depth (0-9)
  }),
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
    maxLevel: 12,
  }),
  TextAlign.configure({
    types: [
      "heading",
      "paragraph",
      "blockquote",
      "listItem",
      "tableCell",
      "tableHeader",
      "image",
    ],
    defaultAlignment: "left",
  }),
  Blockquote,
];
