import { useState } from "react";
import { ClassicToolbar } from "./ClassicToolbar";
import Button from "../base/Button";
import SvgIcon from "../common/SvgIcon";
import { ProfessionalToolbar } from "./ProfessionalToolbar";
import { TOOLBAR_TYPES_ENUM } from "../../constants/Toolbar";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
  initialToolbar?: string;
  editor: Editor;
}

export const Toolbar = ({
  initialToolbar = TOOLBAR_TYPES_ENUM.PROFESSIONAL,
  editor,
}: ToolbarProps) => {
  const { CLASSIC, PROFESSIONAL, HIDE_TOOLBAR } = TOOLBAR_TYPES_ENUM;
  const [currentToolbar, setCurrentToolbar] = useState<string>(initialToolbar);
  const [lastVisibleToolbar, setLastVisibleToolbar] = useState<string>(initialToolbar);

  const handleToolbarChange = (toolbarType: string) => {
    // If hiding the toolbar, remember the current visible toolbar
    if (toolbarType === HIDE_TOOLBAR) {
      setLastVisibleToolbar(currentToolbar);
    }
    // If unhiding (switching from hide to a visible toolbar), update the last visible
    else if (currentToolbar !== HIDE_TOOLBAR) {
      setLastVisibleToolbar(toolbarType);
    }
    
    setCurrentToolbar(toolbarType);
  };

  const handleShowToolbar = () => {
    // Restore the last visible toolbar when unhiding
    setCurrentToolbar(lastVisibleToolbar);
  };

  // Render toolbar based on current selection
  switch (currentToolbar) {
    case CLASSIC:
      return <ClassicToolbar onToolbarChange={handleToolbarChange} />;
    case PROFESSIONAL:
      return <ProfessionalToolbar onToolbarChange={handleToolbarChange} editor={editor} />;
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
