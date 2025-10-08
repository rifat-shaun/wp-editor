import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import SvgIcon from "../common/SvgIcon";
import { Button } from "../base";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { TOOLBAR_TYPES } from "@/constants/Toolbar";

interface ToolbarDropdownProps {
  onToolbarChange?: (toolbarType: string) => void;
}

export const ToolbarDropdown = ({ onToolbarChange }: ToolbarDropdownProps) => {
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  const TOOLBAR_MENU_ITEMS = [
    {
      key: TOOLBAR_TYPES.CLASSIC.name,
      label: TOOLBAR_TYPES.CLASSIC.label,
      icon: <SvgIcon name="toolbar-classic" strokeWidth={4} />,
    },
    {
      key: TOOLBAR_TYPES.PROFESSIONAL.name,
      label: TOOLBAR_TYPES.PROFESSIONAL.label,
      icon: <SvgIcon name="toolbar-professional" strokeWidth={4} />,
    },
    {
      key: TOOLBAR_TYPES.NONE.name,
      label: TOOLBAR_TYPES.NONE.label,
      icon: <SvgIcon name="hide-toolbar" strokeWidth={4} />,
    },
  ];

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


