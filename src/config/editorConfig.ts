import type { Editor } from "@tiptap/react";
import { TOOLBAR_TYPES_ENUM } from "../constants/Toolbar";

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
}

export const defaultEditorConfig: EditorConfig = {
  showBubbleMenu: true,
  showFloatingMenu: false,
  showPageSizeSelector: true,
  content: "",
  enablePagination: true,
  defaultToolbar: TOOLBAR_TYPES_ENUM.PROFESSIONAL,
  onContentChange: undefined,
};
