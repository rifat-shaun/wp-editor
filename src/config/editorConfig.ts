import type { Editor } from "@tiptap/react";
import { TOOLBAR_TYPES_ENUM } from "../constants/Toolbar";
import { AI_AUTO_COMPLETION_DEBOUNCE_TIME, AI_AUTO_COMPLETION_TRIGGER_WORD_COUNT } from "@/constants";
import { DEFAULT_DEBOUNCE_TIME_FOR_CONTENT_CHANGE } from "@/constants/Base";

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
  /** Enable/disable the page size selector */
  showPageSizeSelector?: boolean;
  /** Initial content for the editor */
  content?: string;
  /** Enable/disable pagination */
  enablePagination?: boolean;
  /** Initial toolbar */
  defaultToolbar?: string;
  /** Calback debounce time for content change milliseconds */
  debounceTimeForContentChange?: number;
  /** AI Autocompletion configuration */
  aiAutocompletion?: AIAutocompletionConfig;
  /** Enable variable text feature */
  enableVariableText?: boolean;
  /** Variable values mapping (key: variable name, value: display text) */
  variableValues?: Record<string, string>;
  /** Callback when share is clicked */
  onShare?: () => void;
  /** Callback when content changes */
  onContentChange?: (editor: Editor) => void;
  /** Callback when editor is ready with helper methods */
  onEditorReady?: (methods: {
    insertVariable: (key: string, value?: string) => void;
    updateVariableValues: (values: Record<string, string>) => void;
  }) => void;
}

export const defaultEditorConfig: EditorConfig = {
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
  enableVariableText: false,
  variableValues: {},
  debounceTimeForContentChange: DEFAULT_DEBOUNCE_TIME_FOR_CONTENT_CHANGE,
  onShare: undefined,
};
