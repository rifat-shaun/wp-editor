import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export const usePageMethods = (editor: Editor) => {
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: "A4",
    orientation: "portrait",
  });

  const getPageClass = (config: PageConfig) => {
    const { size, orientation } = config;
    const baseClass = `page-${size.toLowerCase()}`;
    return orientation === "landscape" ? `${baseClass}-landscape` : baseClass;
  };

  return {
    pageClass: getPageClass(pageConfig),
    pageConfig,
    setPageConfig,
  };
};
