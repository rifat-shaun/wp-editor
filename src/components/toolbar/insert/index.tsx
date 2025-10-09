import { useState } from "react";
import { Editor } from "@tiptap/react";
import SvgIcon from "@/components/common/SvgIcon";
import { Popover } from "antd";
import { ImageUploadForm } from "./ImageUploadForm";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Button } from "@/components/base";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import { DividerDropdownContent } from "./DividerDropdownContent";
import { InsertLinkButton } from "@/components/shared/InsertLinkButton";

export const InsertOptions = ({
  editor,
}: {
  editor: Editor;
}) => {
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;
  const [isDividerOpen, setIsDividerOpen] = useState(false);
  const [isImageFormOpen, setIsImageFormOpen] = useState(false);
  return (
    <>
      <InsertLinkButton editor={editor} activeToolbarType={currentToolbar} />
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
        size={isClassicToolbar ? "small" : "medium"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Insert Code Block"
      >
        {isClassicToolbar ? (
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
          size={isClassicToolbar ? "small" : "medium"}
          onClick={() => setIsImageFormOpen(true)}
          title="Insert Image"
        >
          {isClassicToolbar ? (
            <div className="relative flex items-center gap-1">
              <SvgIcon name="image" strokeWidth={3} />
              <span className="text-xs">Image</span>
              <ArrowDropDownOutlined
                sx={{ fontSize: "14px", color: "inherit" }}
              />
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <SvgIcon name="image" size={20} strokeWidth={3} />
                <ArrowDropDownOutlined
                  sx={{ fontSize: "14px", color: "inherit" }}
                />
              </div>
              <span className="text-xs">Image</span>
            </div>
          )}
        </Button>
      </Popover>
    </>
  );
};
