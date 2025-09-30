import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { TOOLBAR_TYPES, TOOLBAR_MENU_ITEMS } from "../../constants/Toolbar";

interface ProfessionalToolbarProps {
  onToolbarChange?: (toolbarType: string) => void;
}

export const ProfessionalToolbar = ({
  onToolbarChange,
}: ProfessionalToolbarProps) => {
  const { PROFESSIONAL } = TOOLBAR_TYPES;

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${PROFESSIONAL.height}px` }}
    >
      <div className="flex-1">Hello 2</div>
      <Dropdown
        menu={{ items: TOOLBAR_MENU_ITEMS, onClick: handleMenuClick }}
        placement="bottomRight"
      >
        <div className="px-3 py-1 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
          Toolbar
        </div>
      </Dropdown>
    </div>
  );
};
