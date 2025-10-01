import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { TOOLBAR_TYPES, TOOLBAR_MENU_ITEMS } from "../../constants/Toolbar";
import SvgIcon from "@/components/common/SvgIcon";

interface ClassicToolbarProps {
  onToolbarChange?: (toolbarType: string) => void;
}

export const ClassicToolbar = ({ onToolbarChange }: ClassicToolbarProps) => {
  const { CLASSIC } = TOOLBAR_TYPES;

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${CLASSIC.height}px` }}
    >
      <div className="flex-1">Hello 2</div>
      <Dropdown
        menu={{ items: TOOLBAR_MENU_ITEMS, onClick: handleMenuClick }}
        placement="bottomRight"
      >
        <div className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
          <SvgIcon name="toolbar" size={16} />
          Toolbar
        </div>
      </Dropdown>
    </div>
  );
};
