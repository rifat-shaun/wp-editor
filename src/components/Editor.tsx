import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useState } from "react";
import PageSizeSelector, { type PageConfig } from "./PageSizeSelector";

const Editor = () => {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: "A4",
    orientation: "portrait",
  });

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  const getPageClass = (config: PageConfig) => {
    const { size, orientation } = config;
    const baseClass = `page-${size.toLowerCase()}`;
    return orientation === "landscape" ? `${baseClass}-landscape` : baseClass;
  };

  return (
    <div className="h-full p-5 bg-neutral-100 flex">
      <div className="flex gap-4 mb-6">
        <PageSizeSelector
          selectedConfig={pageConfig}
          onConfigChange={setPageConfig}
        />
      </div>

      <div className={`flex justify-center items-center w-full overflow-y-auto`}>
        <div className={getPageClass(pageConfig)}>
          <EditorContext.Provider value={providerValue}>
            <EditorContent editor={editor} />
            <FloatingMenu editor={editor}>
              This is the floating menu
            </FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
          </EditorContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Editor;
