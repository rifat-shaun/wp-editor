import { ClassicToolbar } from "./ClassicToolbar";
import Button from "../base/Button";
import SvgIcon from "../common/SvgIcon";
import { ProfessionalToolbar } from "./ProfessionalToolbar";
import { TOOLBAR_TYPES_ENUM } from "../../constants/Toolbar";
import { Editor } from "@tiptap/react";
import { ToolbarProvider, useToolbar } from "@/contexts/ToolbarContext";

interface ToolbarProps {
  initialToolbar?: string;
  editor: Editor;
}

const ToolbarContent = ({ editor }: ToolbarProps) => {
  const { CLASSIC, PROFESSIONAL, HIDE_TOOLBAR } = TOOLBAR_TYPES_ENUM;
  const { currentToolbar, handleToolbarChange, handleShowToolbar } =
    useToolbar();

  switch (currentToolbar) {
    case CLASSIC:
      return <ClassicToolbar onToolbarChange={handleToolbarChange} editor={editor} />;
    case PROFESSIONAL:
      return (
        <ProfessionalToolbar
          onToolbarChange={handleToolbarChange}
          editor={editor}
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
  initialToolbar = TOOLBAR_TYPES_ENUM.PROFESSIONAL,
  editor,
}: ToolbarProps) => {
  return (
    <ToolbarProvider defaultToolbar={initialToolbar}>
      <ToolbarContent editor={editor} />
    </ToolbarProvider>
  );
};
