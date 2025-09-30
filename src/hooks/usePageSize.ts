import { useState } from "react";
import type { PageConfig } from "../components/PageSizeSelector";

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
    pageConfig,
    setPageConfig,
    pageClass: getPageClass(pageConfig),
  };
};

