import { Dropdown, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  TOOLBAR_TYPES,
  TOOLBAR_MENU_ITEMS,
  TABS,
} from "../../constants/Toolbar";
import SvgIcon from "@/components/common/SvgIcon";
import { Editor } from "@tiptap/react";
import { capitalize } from "@/utils/common";
import { useState } from "react";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { HomeOptions } from ".";

interface ClassicToolbarProps {
  onToolbarChange?: (toolbarType: string) => void;
  editor: Editor;
}

export const ClassicToolbar = ({
  onToolbarChange,
  editor,
}: ClassicToolbarProps) => {
  const { CLASSIC } = TOOLBAR_TYPES;
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${CLASSIC.height}px` }}
    >
      <div className="flex items-center gap-2">
        <Dropdown
          menu={{
            items: TABS.map((tab) => ({
              key: tab.toLowerCase(),
              label: capitalize(tab),
            })),
            onClick: ({ key }) => setActiveTab(capitalize(key)),
            defaultOpenKeys: [activeTab],
            selectedKeys: [activeTab],
          }}
          placement="bottomLeft"
          onOpenChange={(open) => setIsDropdownOpen(open)}
        >
          <div className="flex items-center gap-1 px-3 py-1 text-sm hover:bg-neutral-50 transition-colors cursor-pointer">
            <Typography.Link>
              <Space>
                <div className="flex items-center justify-center gap-1">
                  <MenuIcon fontSize="small" />
                  <div className="w-10">{activeTab}</div>
                  <div className="transition-all duration-200 ease-in-out">
                    {isDropdownOpen ? (
                      <ExpandLess
                        fontSize="small"
                        className="transition-transform duration-3000 ease-in-out"
                      />
                    ) : (
                      <ExpandMore
                        fontSize="small"
                        className="transition-transform duration-3000 ease-in-out"
                      />
                    )}
                  </div>
                </div>
              </Space>
            </Typography.Link>
          </div>
        </Dropdown>
        <HomeOptions editor={editor} />
      </div>
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
