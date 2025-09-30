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
}

export const defaultEditorConfig: EditorConfig = {
  showBubbleMenu: true,
  showFloatingMenu: true,
  showPageSizeSelector: true,
  initialContent: "",
  enablePagination: true,
};

