import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { TOOLBAR_MENU_ITEMS } from "@/constants/Toolbar";
import SvgIcon from "../common/SvgIcon";

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
    >
      <div className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
        <SvgIcon name="toolbar" size={16} />
        Toolbar
      </div>
    </Dropdown>
  );
};


