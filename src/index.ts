// Main Editor component
export { default as Editor } from "./components/Editor";

// Configuration
export type { EditorConfig } from "./config/editorConfig";
export { defaultEditorConfig } from "./config/editorConfig";

// Types
export type { PageConfig, PageSize, PageOrientation } from "./components/PageSizeSelector";

// Hooks
export { usePageSize } from "./hooks/usePageSize";

// Styles
import "./index.css";

