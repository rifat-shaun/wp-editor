import { ClassicToolbar } from "./ClassicToolbar";
import Button from "../base/Button1";
import SvgIcon from "../common/SvgIcon";
import { ProfessionalToolbar } from "./ProfessionalToolbar";
import { TOOLBAR_TYPES_ENUM } from "../../constants/Toolbar";
import { Editor } from "@tiptap/react";
import { ToolbarProvider, useToolbar } from "@/contexts/ToolbarContext";
import { useState } from "react";
import { TABS, type TTabKey } from "@/constants/Toolbar";

import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import type { EditorConfig } from "@/config/editorConfig";

interface ToolbarProps {
  editorConfig: EditorConfig;
  editor: Editor;
  onPresentationModeToggle: () => void;
  pageConfig: PageConfig;
  setPageConfig: (config: PageConfig) => void;
}

interface ToolbarContentProps {
  editor: Editor;
}

const ToolbarContent = ({ editor }: ToolbarContentProps) => {
  const [activeTab, setActiveTab] = useState<TTabKey>(TABS[0]);
  const { CLASSIC, PROFESSIONAL, HIDE_TOOLBAR } = TOOLBAR_TYPES_ENUM;
  const { currentToolbar, handleToolbarChange, handleShowToolbar } =
    useToolbar();

  switch (currentToolbar) {
    case CLASSIC:
      return <ClassicToolbar onToolbarChange={handleToolbarChange} editor={editor} activeTab={activeTab} setActiveTab={setActiveTab} />;
    case PROFESSIONAL:
      return (
        <ProfessionalToolbar
          onToolbarChange={handleToolbarChange}
          editor={editor}
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
            status="secondary-neutral"
            appearance="outline"
            onClick={handleShowToolbar}
            className="px-[4px] py-[3px]"
          >
            <SvgIcon name="toolbar" size={16} />
          </Button>
        </div>
      );
  }
};

export const Toolbar = ({
  editorConfig,
  editor,
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
      <ToolbarContent editor={editor} />
    </ToolbarProvider>
  );
};
