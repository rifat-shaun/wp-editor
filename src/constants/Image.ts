import { FormatAlignCenter, FormatAlignLeft, FormatAlignRight } from "@mui/icons-material";

export type AlignType = "left" | "center" | "right";
export type ResizeHandle = "top-left" | "top-right" | "bottom-left" | "bottom-right";

// Resize handle list
export const RESIZE_HANDLES: ResizeHandle[] = ["top-left", "top-right", "bottom-left", "bottom-right"];


export const MIN_WIDTH = 50;
export const MAX_WIDTH = 1200;

// Resize direction multipliers for each handle
export const RESIZE_MULTIPLIERS: Record<ResizeHandle, { x: number; y: number }> = {
  "top-left": { x: -1, y: -1 },
  "top-right": { x: 1, y: -1 },
  "bottom-left": { x: -1, y: 1 },
  "bottom-right": { x: 1, y: 1 },
};

// Cursor types for each handle
export const HANDLE_CURSORS: Record<ResizeHandle, string> = {
  "top-left": "nwse-resize",
  "top-right": "nesw-resize",
  "bottom-left": "nesw-resize",
  "bottom-right": "nwse-resize",
};

// Alignment button configurations
export const ALIGNMENT_BUTTONS = [
  { align: "left" as AlignType, Icon: FormatAlignLeft, title: "Align Left" },
  {
    align: "center" as AlignType,
    Icon: FormatAlignCenter,
    title: "Align Center",
  },
  {
    align: "right" as AlignType,
    Icon: FormatAlignRight,
    title: "Align Right",
  },
] as const;