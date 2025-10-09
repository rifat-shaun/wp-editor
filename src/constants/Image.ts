export const RESIZE_CURSOR_POSITION_OPTIONS = {
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
};

export type ResizeCursorPositionType = (typeof RESIZE_CURSOR_POSITION_OPTIONS)[keyof typeof RESIZE_CURSOR_POSITION_OPTIONS];

export const IMAGE_MIN_WIDTH = 50;
export const IMAGE_MAX_WIDTH = 1200;
export const IMAGE_DEFAULT_WIDTH = 300;

// Resize direction multipliers for each handle
export const RESIZE_MULTIPLIERS: Record<ResizeCursorPositionType, { x: number; y: number }> = {
  [RESIZE_CURSOR_POSITION_OPTIONS.TOP_LEFT]: { x: -1, y: -1 },
  [RESIZE_CURSOR_POSITION_OPTIONS.TOP_RIGHT]: { x: 1, y: -1 },
  [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_LEFT]: { x: -1, y: 1 },
  [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_RIGHT]: { x: 1, y: 1 },
};

// Cursor types for each handle
// nswe = north-south-west-east
  export const HANDLE_CURSORS: Record<ResizeCursorPositionType, string> = {
  [RESIZE_CURSOR_POSITION_OPTIONS.TOP_LEFT]: "nwse-resize",
  [RESIZE_CURSOR_POSITION_OPTIONS.TOP_RIGHT]: "nesw-resize",
  [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_LEFT]: "nesw-resize",
  [RESIZE_CURSOR_POSITION_OPTIONS.BOTTOM_RIGHT]: "nwse-resize",
};