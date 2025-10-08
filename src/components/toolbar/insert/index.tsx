import { useState } from "react";
import { Editor } from "@tiptap/react";
import SvgIcon from "@/components/common/SvgIcon";
import { Popover } from "antd";
import { LinkForm } from "./LinkForm";
import { ImageUploadForm } from "./ImageUploadForm";
import { LINK_FORM_MODES } from "../../../constants/LinkConstants";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { useLinks } from "@/hooks/useLinks";
import { Button } from "@/components/base";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import { DividerDropdownContent } from "./DividerDropdownContent";

export const InsertOptions = ({ editor }: { editor: Editor }) => {
  const { getSelectionLinkValues } = useLinks(editor);
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);
  const [isDividerOpen, setIsDividerOpen] = useState(false);
  const [isImageFormOpen, setIsImageFormOpen] = useState(false);

  return (
    <>
      <Popover
        content={
          <LinkForm
            editor={editor}
            mode={LINK_FORM_MODES.INSERT}
            {...getSelectionLinkValues()}
            onSubmit={() => setIsLinkFormOpen(false)}
            onCancel={() => setIsLinkFormOpen(false)}
          />
        }
        trigger="click"
        placement="bottom"
        arrow={false}
        open={isLinkFormOpen}
        onOpenChange={setIsLinkFormOpen}
      >
        <Button
          size={isClassicToolbar ? "small" : "medium"}
          onClick={() => setIsLinkFormOpen(true)}
          title="Insert Link"
        >
          {isClassicToolbar ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="link" strokeWidth={1.5} />
              <span className="text-xs">Link</span>
              <ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <SvgIcon name="link" size={20} strokeWidth={1.5} />
                <ArrowDropDownOutlined sx={{ fontSize: "16px", color: "inherit" }} />
              </div>
              <span className="text-xs">Link</span>
            </div>
          )}
        </Button>
      </Popover>

      <Popover
        content={
          <DividerDropdownContent
            editor={editor}
            onClose={() => setIsDividerOpen(false)}
          />
        }
        trigger="click"
        placement="bottom"
        arrow={false}
        open={isDividerOpen}
        onOpenChange={setIsDividerOpen}
      >
        <Button
          size={isClassicToolbar ? "small" : "medium"}
          onClick={() => setIsDividerOpen(true)}
          title="Insert Divider"
        >
          {isClassicToolbar ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="hr" strokeWidth={4} />
              <span className="text-xs">Divider</span>
              <ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <SvgIcon name="hr" size={20} strokeWidth={4} />
                <ArrowDropDownOutlined sx={{ fontSize: "16px", color: "inherit" }} />
              </div>
              <span className="text-xs">Divider</span>
            </div>
          )}
        </Button>
      </Popover>
      <Button
        size={isClassicToolbar ? "medium" : "large"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Insert Code Block"
        className="flex items-center gap-1"
      >
        <SvgIcon name="code" size={isClassicToolbar ? "18px" : "32px"} strokeWidth={4} />
      </Button>
      <Popover
        content={
          <ImageUploadForm
            editor={editor}
            onSubmit={() => setIsImageFormOpen(false)}
            onCancel={() => setIsImageFormOpen(false)}
          />
        }
        trigger="click"
        placement="bottom"
        arrow={false}
        open={isImageFormOpen}
        onOpenChange={setIsImageFormOpen}
      >
        <Button
          size={isClassicToolbar ? "medium" : "large"}
          onClick={() => setIsImageFormOpen(true)}
          title="Insert Image"
          className="flex items-center gap-1"
        >
          <SvgIcon name="image" size={isClassicToolbar ? "18px" : "32px"} strokeWidth={3} />
        </Button>
      </Popover>
    </>
  );
};
