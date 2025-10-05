import type { Editor } from "@tiptap/react";
import { TOOLBAR_TYPES_ENUM } from "../constants/Toolbar";
import { AI_AUTO_COMPLETION_DEBOUNCE_TIME, AI_AUTO_COMPLETION_TRIGGER_WORD_COUNT } from "@/constants";

export interface AIAutocompletionConfig {
  /** Enable/disable AI autocompletion */
  enabled?: boolean;
  /** Minimum number of words required to trigger autocompletion */
  minWordsToTriggerAutoCompletion?: number;
  /** Debounce time in milliseconds */
  debounceTime?: number;
  /** Required: Custom fetch function for API calls. AI autocompletion only works when this is provided. */
  fetchCompletion?: (text: string) => Promise<string>;
}

export interface EditorConfig {
  /** Enable/disable the bubble menu that appears on text selection */
  showBubbleMenu?: boolean;
  /** Enable/disable the floating menu that appears on empty lines */
  showFloatingMenu?: boolean;
  /** Enable/disable the page size selector */
  showPageSizeSelector?: boolean;
  /** Initial content for the editor */
  content?: string;
  /** Enable/disable pagination */
  enablePagination?: boolean;
  /** Initial toolbar */
  defaultToolbar?: string;
  /** Callback when content changes */
  onContentChange?: (editor: Editor) => void;
  /** AI Autocompletion configuration */
  aiAutocompletion?: AIAutocompletionConfig;
}

export const defaultEditorConfig: EditorConfig = {
  showBubbleMenu: true,
  showFloatingMenu: false,
  showPageSizeSelector: true,
  content: "",
  enablePagination: true,
  defaultToolbar: TOOLBAR_TYPES_ENUM.PROFESSIONAL,
  onContentChange: undefined,
  aiAutocompletion: {
    enabled: false,
    minWordsToTriggerAutoCompletion: AI_AUTO_COMPLETION_TRIGGER_WORD_COUNT,
    debounceTime: AI_AUTO_COMPLETION_DEBOUNCE_TIME,
  },
};
