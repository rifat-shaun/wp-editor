import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useState } from "react";
import PageSizeSelector, { type PageSize } from "./PageSizeSelector";

const Editor = () => {
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  const getPageClass = (size: PageSize) => {
    switch (size) {
      case 'A4': return 'page-a4';
      case 'A3': return 'page-a3';
      case 'Letter': return 'page-letter';
      case 'Legal': return 'page-legal';
      case 'Tabloid': return 'page-tabloid';
      default: return 'page-a4';
    }
  };

  return (
    <div className="editor-container">
      <div className="flex gap-4 mb-6">
        <PageSizeSelector selectedSize={pageSize} onSizeChange={setPageSize} />
      </div>
      
      <div className={getPageClass(pageSize)}>
        <EditorContext.Provider value={providerValue}>
          <EditorContent editor={editor} />
          <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
          <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </EditorContext.Provider>
      </div>
    </div>
  );
};

export default Editor;
