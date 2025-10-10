import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import { PAGE_BACKGROUND_COLORS } from "@/constants/PageBackground";
import { Editor } from "@tiptap/react";
import { useState, useEffect } from "react";

export const usePageMethods = (editor: Editor) => {
  const [selectedBGColor, setSelectedBGColor] = useState(PAGE_BACKGROUND_COLORS[0].value);

	const handleSetPageBackgroundColor = (color: string) => {
		setSelectedBGColor(color);
		editor.chain().focus().setPageBackgroundColor(color).run();
	}
  
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: "A4",
    orientation: "portrait",
  });

  // Store orientation in data attribute for export
  useEffect(() => {
    document.body.setAttribute('data-page-orientation', pageConfig.orientation);
  }, [pageConfig.orientation]);

  const getPageClass = (config: PageConfig) => {
    const { size, orientation } = config;
    const baseClass = `page-${size.toLowerCase()}`;
    return orientation === "landscape" ? `${baseClass}-landscape` : baseClass;
  };


  const handleInsertPageBreak = () => {
    editor.chain().focus().setPageBreak().run();
  }

  return {
    pageClass: getPageClass(pageConfig),
    selectedBGColor,
    handleSetPageBackgroundColor,
    pageConfig,
    setPageConfig,
    handleInsertPageBreak,
  };
};
