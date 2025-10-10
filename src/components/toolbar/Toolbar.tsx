import { ClassicToolbar } from "./ClassicToolbar";
import { Button } from "../base/Button";
import SvgIcon from "../common/SvgIcon";
import { ProfessionalToolbar } from "./ProfessionalToolbar";
import { TOOLBAR_TYPES_ENUM } from "../../constants/Toolbar";
import { ToolbarProvider, useToolbar } from "@/contexts/ToolbarContext";
import { useState } from "react";
import { TABS, type TTabKey } from "@/constants/Toolbar";

import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import type { EditorConfig } from "@/config/editorConfig";

interface ToolbarProps {
  editorConfig: EditorConfig;
  onPresentationModeToggle: () => void;
  pageConfig: PageConfig;
  setPageConfig: (config: PageConfig) => void;
}

const ToolbarContent = () => {
  const [activeTab, setActiveTab] = useState<TTabKey>(TABS[0]);
  const { CLASSIC, PROFESSIONAL, HIDE_TOOLBAR } = TOOLBAR_TYPES_ENUM;
  const { currentToolbar, handleToolbarChange, handleShowToolbar } =
    useToolbar();

  switch (currentToolbar) {
    case CLASSIC:
      return <ClassicToolbar onToolbarChange={handleToolbarChange} activeTab={activeTab} setActiveTab={setActiveTab} />;
    case PROFESSIONAL:
      return (
        <ProfessionalToolbar
          onToolbarChange={handleToolbarChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      );
    case HIDE_TOOLBAR:
    default:
      return (
        <div className="fixed top-1 right-6 z-50">
          <Button
            id="show-toolbar"
            onClick={handleShowToolbar}
            className="px-[4px] py-[3px] bg-white"
          >
            <SvgIcon name="toolbar" size={16} />
          </Button>
        </div>
      );
  }
};

export const Toolbar = ({
  editorConfig,
  onPresentationModeToggle,
  pageConfig,
  setPageConfig
}: ToolbarProps) => {

  return (
    <ToolbarProvider
      editorConfig={editorConfig}
      onPresentationModeToggle={onPresentationModeToggle}
      pageConfig={pageConfig}
      setPageConfig={setPageConfig}
    >
      <ToolbarContent />
    </ToolbarProvider>
  );
};
