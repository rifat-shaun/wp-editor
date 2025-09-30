import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import { useMemo } from "react";
import PageSizeSelector from "./PageSizeSelector";
import { usePageSize } from "../hooks/usePageSize";
import BubbleMenuContent from "./menubar/BubbleMenuContent";
import type { EditorConfig } from "../config/editorConfig";
import { defaultEditorConfig } from "../config/editorConfig";
import { EditorExtensions } from "../extensions";
import ClassicToolbar from "./toolbar/ClassicToolbar";

interface EditorProps {
  config?: EditorConfig;
}

const Editor = ({ config = {} }: EditorProps) => {
  const editorConfig = { ...defaultEditorConfig, ...config };
  const { pageClass, pageConfig, setPageConfig } = usePageSize();

  const editor = useEditor({
    extensions: EditorExtensions,
    content: editorConfig.initialContent,
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <div className="h-full flex flex-col bg-neutral-200">
      {/* Toolbar */}
      <ClassicToolbar />

      {/* Main Content Area */}
      <div className="flex-1 flex p-2 overflow-hidden">
        {editorConfig.showPageSizeSelector && (
          <div className="flex gap-4 mb-6">
            <PageSizeSelector
              selectedConfig={pageConfig}
              onConfigChange={setPageConfig}
            />
          </div>
        )}

        <div className="flex-1 flex justify-center items-start w-full overflow-y-auto">
          <div className={editorConfig.enablePagination ? pageClass : ""}>
            <EditorContext.Provider value={providerValue}>
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
                  <BubbleMenuContent editor={editor} />
                </BubbleMenu>
              )}
            </EditorContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
