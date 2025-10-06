import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import { useMemo, useEffect, useRef } from "react";
import { usePageSize } from "@/hooks/usePageSize";
import { usePresentationMode } from "@/hooks/usePresentationMode";
import BubbleMenuContent from "./menubar/BubbleMenuContent";
import type { EditorConfig } from "@/config/editorConfig";
import { defaultEditorConfig } from "@/config/editorConfig";
import { getEditorExtensions } from "@/extensions";
import { Toolbar } from "@/components/toolbar/Toolbar";
import { Footer } from "@/components/footer";
import { PresentationControls } from "./PresentationControls";

export interface EditorProps {
  config?: EditorConfig;
}

const Editor = ({ config = {} }: EditorProps) => {
  const editorPageRef = useRef<HTMLDivElement>(null);
  const editorConfig = { ...defaultEditorConfig, ...config };
  const { pageClass } = usePageSize();

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: getEditorExtensions(editorConfig),
    content: editorConfig.content,
    autofocus: false,
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

  const { isPresentationMode, isLaserActive, enterPresentationMode, exitPresentationMode, handleLaserToggle } = usePresentationMode(editor);

  // Keep editor focused - refocus if focus is lost
  useEffect(() => {
    if (!editor || !editorPageRef.current) return;

    const handleClick = (e: MouseEvent) => {
      // Only handle clicks within the editor page area
      if (editorPageRef.current?.contains(e.target as Node)) {
        editor.commands.focus();

        return;
      }
    };

    // Add click listener to maintain focus
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) return null;

  return (
    <div className={`h-full flex flex-col bg-neutral-200 editor-container ${isPresentationMode ? "lax-presentation-mode" : ""} ${isLaserActive ? "laser-active" : ""}`}>
      {/* Toolbar */}
      {!isPresentationMode && (
        <Toolbar initialToolbar={editorConfig.defaultToolbar} editor={editor} />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-start w-full overflow-auto py-4">
        <div
          className={`${editorConfig.enablePagination ? pageClass : ""} editor-content`}
          ref={editorPageRef}
        >
          <EditorContext.Provider value={providerValue}>
            <EditorContent editor={editor} />

            {editorConfig.showFloatingMenu && editor && !isPresentationMode && (
              <FloatingMenu editor={editor}>
                <div className="bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
                  This is the floating menu
                </div>
              </FloatingMenu>
            )}

            {editorConfig.showBubbleMenu && editor && !isPresentationMode && (
              <BubbleMenu editor={editor}>
                <BubbleMenuContent editor={editor} />
              </BubbleMenu>
            )}
          </EditorContext.Provider>
        </div>
      </div>

      {/* Footer */}
      {!isPresentationMode && (
        <Footer editor={editor} onPresentationModeToggle={enterPresentationMode} />
      )}

      {/* Presentation Controls */}
      {isPresentationMode && (
        <PresentationControls onExit={exitPresentationMode} onLaserToggle={handleLaserToggle} />
      )}
    </div>
  );
};

export default Editor;
