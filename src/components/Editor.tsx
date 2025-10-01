import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import { usePageSize } from "../hooks/usePageSize";
import BubbleMenuContent from "./menubar/BubbleMenuContent";
import type { EditorConfig } from "../config/editorConfig";
import { defaultEditorConfig } from "../config/editorConfig";
import { EditorExtensions } from "../extensions";
import { Toolbar } from "./toolbar/Toolbar";
import { Footer } from "./footer";
import { useEditorContext } from "../contexts/LaxEditorContext";
import { useEffect } from "react";

interface EditorProps {
  config?: EditorConfig;
}

const Editor = ({ config = {} }: EditorProps) => {
  const editorConfig = { ...defaultEditorConfig, ...config };
  const { pageClass } = usePageSize();
  const { setEditor, setConfig } = useEditorContext();

  const editor = useEditor({
    extensions: EditorExtensions,
    content: editorConfig.initialContent,
  });

  useEffect(() => {
    setEditor(editor);
    setConfig(config);
  }, [editor, config]);

  return (
    <div className="h-full flex flex-col bg-neutral-200">
      {/* Toolbar */}
      <Toolbar initialToolbar={editorConfig.defaultToolbar} />

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-start w-full overflow-auto py-4">
        <div className={editorConfig.enablePagination ? pageClass : ""}>
          <EditorContent editor={editor} />

          {editorConfig.showFloatingMenu && editor && (
            <FloatingMenu editor={editor}>
              <div className="bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
                This is the floating menu
              </div>
            </FloatingMenu>
          )}

          {editorConfig.showBubbleMenu && editor && (
            <BubbleMenu editor={editor}>
              <BubbleMenuContent />
            </BubbleMenu>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer editor={editor} />
    </div>
  );
};

export default Editor;
