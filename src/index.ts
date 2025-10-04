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
export { Toolbar } from "./components/toolbar/Toolbar";
export { ProfessionalToolbar } from "./components/toolbar/ProfessionalToolbar";
export { ClassicToolbar } from "./components/toolbar/ClassicToolbar";
export { default as PageSizeSelector } from "./components/PageSizeSelector";

// Toolbar Components
export { HeadingOptions } from "./components/toolbar/HeadingOptions";
export { HomeOptions } from "./components/toolbar/HomeOptions";
export { FontStyleOptions } from "./components/toolbar/FontStyleOptions";
export { ParagraphStyleOptions } from "./components/toolbar/ParagraphStyleOption";

// Contexts
export { ToolbarProvider, useToolbar } from "./contexts/ToolbarContext";

// Hooks
export { usePageSize } from "./hooks/usePageSize";
export { useTiptapEditorState } from "./hooks/useTiptapEditorState";
export { useHeadingStyleMethods } from "./hooks/useHeadingStyleMethods";
export { useFontStyleMethods } from "./hooks/useFontStyleMethods";
export { useHomeOptionMethods } from "./hooks/useHomeOptionMethods";
export { useParagraphStyleMethods } from "./hooks/useParagraphStyleMethods";

// Constants
export { HEADING_OPTIONS, HEADING_STYLES } from "./constants/Heading";
export { TOOLBAR_TYPES_ENUM } from "./constants/Toolbar";

// Types
export type { PageConfig, PageSize, PageOrientation } from "./components/PageSizeSelector";
export type { ToolbarContextType } from "./contexts/ToolbarContext";

