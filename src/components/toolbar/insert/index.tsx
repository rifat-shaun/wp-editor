import { useState, useCallback } from "react";
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

type ToolbarType = "classic" | "professional" | null;

export const InsertOptions = ({ 
  editor,
  toolbarType
}: { 
  editor: Editor;
  toolbarType?: ToolbarType;
}) => {
  const { currentToolbar } = useToolbar();
  const effectiveToolbarType = toolbarType !== undefined 
    ? toolbarType 
    : (currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC ? "classic" : "professional");
  const isClassicToolbar = effectiveToolbarType === "classic";
  const isBubbleMenu = effectiveToolbarType === null;
  const [isDividerOpen, setIsDividerOpen] = useState(false);
  const [isImageFormOpen, setIsImageFormOpen] = useState(false);

  return (
    <>
      <InsertLinkOptions
        editor={editor}
        toolbarType={effectiveToolbarType}
      />

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
          size={isBubbleMenu || isClassicToolbar ? "small" : "medium"}
          onClick={() => setIsDividerOpen(true)}
          title="Insert Divider"
        >
          {isBubbleMenu ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="hr" strokeWidth={4} />
              <ArrowDropDownOutlined
                sx={{ fontSize: "14px", color: "inherit" }}
              />
            </div>
          ) : isClassicToolbar ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="hr" strokeWidth={4} />
              <span className="text-xs">Divider</span>
              <ArrowDropDownOutlined
                sx={{ fontSize: "14px", color: "inherit" }}
              />
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <SvgIcon name="hr" size={20} strokeWidth={4} />
                <ArrowDropDownOutlined
                  sx={{ fontSize: "16px", color: "inherit" }}
                />
              </div>
              <span className="text-xs">Divider</span>
            </div>
          )}
        </Button>
      </Popover>

      <Button
        size={isBubbleMenu || isClassicToolbar ? "small" : "medium"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Insert Code Block"
      >
        {isBubbleMenu ? (
          <SvgIcon name="code" strokeWidth={4} />
        ) : isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="code" strokeWidth={4} />
            <span className="text-xs">Code Block</span>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1">
            <SvgIcon name="code" size={20} strokeWidth={4} />
            <span className="text-xs">Code Block</span>
          </div>
        )}
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
          size={isBubbleMenu || isClassicToolbar ? "small" : "medium"}
          onClick={() => setIsImageFormOpen(true)}
          title="Insert Image"
        >
          {isBubbleMenu ? (
            <SvgIcon name="image" strokeWidth={3} />
          ) : isClassicToolbar ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="image" strokeWidth={3} />
              <span className="text-xs">Image</span>
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-1">
              <SvgIcon name="image" size={20} strokeWidth={3} />
              <span className="text-xs">Image</span>
            </div>
          )}
        </Button>
      </Popover>
    </>
  );
};

export const InsertLinkOptions = ({
  editor,
  toolbarType,
}: {
  editor: Editor;
  toolbarType: ToolbarType;
}) => {
  const { getSelectionLinkValues } = useLinks(editor);
  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);

  const handleClose = useCallback(() => setIsLinkFormOpen(false), []);
  const handleOpen = useCallback(() => setIsLinkFormOpen(true), []);

  const isClassic = toolbarType === "classic";
  const isBubbleMenu = toolbarType === null;
  const buttonSize = isBubbleMenu || isClassic ? "small" : "medium";

  return (
    <Popover
      content={
        <LinkForm
          editor={editor}
          mode={LINK_FORM_MODES.INSERT}
          {...getSelectionLinkValues()}
          onSubmit={handleClose}
          onCancel={handleClose}
        />
      }
      trigger="click"
      placement="bottom"
      arrow={false}
      open={isLinkFormOpen}
      onOpenChange={setIsLinkFormOpen}
    >
      <Button size={buttonSize} onClick={handleOpen} title="Insert Link">
        {isBubbleMenu ? (
          <SvgIcon name="link" strokeWidth={1.5} />
        ) : isClassic ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="link" strokeWidth={1.5} />
            <span className="text-xs">Link</span>
            <ArrowDropDownOutlined
              sx={{ fontSize: "14px", color: "inherit" }}
            />
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <SvgIcon name="link" size={20} strokeWidth={1.5} />
              <ArrowDropDownOutlined
                sx={{ fontSize: "16px", color: "inherit" }}
              />
            </div>
            <span className="text-xs">Link</span>
          </div>
        )}
      </Button>
    </Popover>
  );
};
