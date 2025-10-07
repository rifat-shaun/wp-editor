import { useState } from "react";
import { Editor } from "@tiptap/react";
import SvgIcon from "@/components/common/SvgIcon";
import { Popover } from "antd";
import { LINK_FORM_MODES, LinkForm } from "./LinkForm";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { useLinks } from "@/hooks/useLinks";
import { Button } from "@/components/base";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import { DividerDropdownContent } from "./DividerDropdownContent";

export const InsertOptions = ({ editor }: { editor: Editor }) => {
  const { getSelectionLinkValues } = useLinks(editor);
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);
  const [isDividerOpen, setIsDividerOpen] = useState(false);

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
          size={isClassicToolbar ? "medium" : "large"}
          onClick={() => setIsLinkFormOpen(true)}
          title="Insert Link"
          className="flex items-center gap-1"
        >
          <SvgIcon
            name="link"
            size={isClassicToolbar ? "18px" : "32px"}
            strokeWidth={2}
          />
          <ArrowDropDownOutlined
            sx={{
              fontSize: isClassicToolbar ? "18px" : "22px",
              color: "inherit",
            }}
          />
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
          size={isClassicToolbar ? "medium" : "large"}
          onClick={() => setIsDividerOpen(true)}
          title="Insert Divider"
          className="flex items-center gap-1"
        >
          <LineStyleIcon
            sx={{
              fontSize: isClassicToolbar ? "18px" : "32px",
              color: "inherit",
            }}
          />
        </Button>
      </Popover>
    </>
  );
};
