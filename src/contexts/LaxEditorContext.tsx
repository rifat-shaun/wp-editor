import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Editor } from "@tiptap/react";
import { defaultEditorConfig, type EditorConfig } from "../config/editorConfig";

interface EditorContextType {
  editor: Editor | null;
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
  config: EditorConfig;
  setConfig: React.Dispatch<React.SetStateAction<EditorConfig>>;
}

const LaxEditorContext = createContext<EditorContextType | undefined>(
  undefined
);

interface LaxEditorProviderProps {
  children: ReactNode;
}

export const LaxEditorProvider: React.FC<LaxEditorProviderProps> = ({
  children,
}): React.ReactElement => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [config, setConfig] = useState<EditorConfig>(defaultEditorConfig);

  return (
    <LaxEditorContext.Provider value={{ editor, setEditor, config, setConfig }}>
      {children}
    </LaxEditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(LaxEditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }

  return context;
};
