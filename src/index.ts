// Styles
import "./index.css";

// SVG Icons Registry
import "./utils/svgIconRegistry";

// Main Editor component
export { default as Editor } from "./components/Editor";

// Configuration
export type { EditorConfig } from "./config/editorConfig";
export { defaultEditorConfig } from "./config/editorConfig";

// Components
export { default as SvgIcon } from "./components/common/SvgIcon";

// Types
export type { PageConfig, PageSize, PageOrientation } from "./components/PageSizeSelector";

// Hooks
export { usePageSize } from "./hooks/usePageSize";

