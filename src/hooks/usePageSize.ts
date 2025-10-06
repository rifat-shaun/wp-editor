import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import { useState } from "react";

export const usePageSize = () => {
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
