import type { EditorConfig } from "../config/editorConfig";
import { LaxEditorProvider } from "../contexts/LaxEditorContext";
import Editor from "./Editor";

interface LaxDocumentEditorProps {
  config?: EditorConfig;
}

export const LaxDocumentEditor = ({ config }: LaxDocumentEditorProps) => {
  return (
    <LaxEditorProvider>
      <Editor config={config} />
    </LaxEditorProvider>
  );
};
