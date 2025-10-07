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
import Heading from "@tiptap/extension-heading";
import { VariableTable, VariableTableCell, VariableTableHeader, VariableTableRow } from "./VariableTable";
import { VariableText } from "./VariableText";
import type { EditorConfig } from "@/config/editorConfig";
import { AI_AUTO_COMPLETION_DEBOUNCE_TIME, AI_AUTO_COMPLETION_TRIGGER_WORD_COUNT } from "@/constants";
import Link from "@tiptap/extension-link";
import { HorizontalRuleWithStyle } from "./HorizontalRuleWithStyle";
import PageMargin from "./PageMargin";

const getEditorExtensions = (config?: EditorConfig) => [
  StarterKit.configure({
    orderedList: false, // Disable default to use our custom one
    bulletList: false, // Disable default to use our custom one
    listItem: false, // Disable default to use our custom one with depth limit
    heading: false, // Disable default to use our custom one
    blockquote: false, // Disable default to use our custom one
    link: false, // Disable default to use our custom one
    horizontalRule: false, // Disable default to use our custom one
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
  // AIAutocompletion MUST be after Indent to intercept Tab key first (due to reverse processing order)
  AIAutocompletion.configure({
    minWordsToTriggerAutoCompletion: config?.aiAutocompletion?.minWordsToTriggerAutoCompletion || AI_AUTO_COMPLETION_TRIGGER_WORD_COUNT,
    debounceTime: config?.aiAutocompletion?.debounceTime || AI_AUTO_COMPLETION_DEBOUNCE_TIME,
    // Only enable if fetchCompletion function is provided
    isEnabled: !!(config?.aiAutocompletion?.enabled && config?.aiAutocompletion?.fetchCompletion),
    fetchCompletion: config?.aiAutocompletion?.fetchCompletion,
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
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  VariableTable.configure({
    resizable: true,
    allowTableNodeSelection: true,
    lastColumnResizable: true,
  }),
  VariableTableCell,
  VariableTableHeader,
  VariableTableRow,
  VariableText.configure({
    enabled: config?.enableVariableText || false,
    variableValues: config?.variableValues || {},
  }),
  Link.configure({
    openOnClick: false,
    linkOnPaste: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
  }),
  HorizontalRuleWithStyle,
  PageMargin.configure({
    unit: 'in',
    defaultMargins: {
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
    },
  }),
];

// Backward compatibility - default extensions without config
export const EditorExtensions = getEditorExtensions;
