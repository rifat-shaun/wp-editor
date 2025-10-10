import { useEditor } from "@tiptap/react";
import { useEffect, useRef } from "react";
import type { EditorConfig } from "@/config/editorConfig";
import { defaultEditorConfig } from "@/config/editorConfig";
import { EditorExtensions } from "@/extensions";
import { EditorShellProvider } from "@/contexts/EditorShellContext";
import { EditorShell } from "./EditorShell";
import { ConfigProvider } from 'antd';

export interface EditorProps {
  config?: EditorConfig;
}

const Editor = ({ config = {} }: EditorProps) => {
  const editorConfig = { ...defaultEditorConfig, ...config };
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: EditorExtensions(editorConfig),
    content: editorConfig.content,
    autofocus: false,
    editable: !editorConfig.asViewer && editorConfig.editable,
    onUpdate: ({ editor: editorInstance }) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      // Restart after debounce time for content change
      saveTimeoutRef.current = setTimeout(() => {
        if (editorConfig.onContentChange) {
          editorConfig.onContentChange(editorInstance);
        }
      }, editorConfig.debounceTimeForContentChange);
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <EditorShellProvider editor={editor} editorConfig={editorConfig}>
      <ConfigProvider prefixCls="editor">
        <EditorShell />
      </ConfigProvider>
    </EditorShellProvider>
  );
};

export default Editor;
