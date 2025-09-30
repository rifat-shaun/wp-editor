import { TOOLBAR_TYPES_ENUM } from "../constants/Toolbar";

export interface EditorConfig {
  /** Enable/disable the bubble menu that appears on text selection */
  showBubbleMenu?: boolean;
  /** Enable/disable the floating menu that appears on empty lines */
  showFloatingMenu?: boolean;
  /** Enable/disable the page size selector */
  showPageSizeSelector?: boolean;
  /** Initial content for the editor */
  initialContent?: string;
  /** Enable/disable pagination */
  enablePagination?: boolean;
  /** Initial toolbar */
  defaultToolbar?: string;
}

export const defaultEditorConfig: EditorConfig = {
  showBubbleMenu: true,
  showFloatingMenu: true,
  showPageSizeSelector: true,
  initialContent: "",
  enablePagination: true,
  defaultToolbar: TOOLBAR_TYPES_ENUM.PROFESSIONAL,
};
