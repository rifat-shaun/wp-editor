import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { TOOLBAR_MENU_ITEMS } from "@/constants/Toolbar";
import SvgIcon from "../common/SvgIcon";
import { Button } from "../base";
import { ArrowDropDownRounded } from "@mui/icons-material";

interface ToolbarDropdownProps {
  onToolbarChange?: (toolbarType: string) => void;
}

export const ToolbarDropdown = ({ onToolbarChange }: ToolbarDropdownProps) => {
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  return (
    <Dropdown
      menu={{ items: TOOLBAR_MENU_ITEMS, onClick: handleMenuClick }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button
        title="Toolbar"
        size="small"
        active={false}
        className="flex items-center gap-1 cursor-pointer"
      >
        <SvgIcon name="toolbar" strokeWidth={2} />
        Toolbar
        <ArrowDropDownRounded sx={{ fontSize: "16px", color: "inherit" }} />
      </Button>
    </Dropdown>
  );
};


