import { Dropdown, Space, Typography } from "antd";
import { TOOLBAR_TYPES, TABS, type TTabKey } from "@/constants/Toolbar";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { ExpandLess, ExpandMore, Menu as MenuIcon } from "@mui/icons-material";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { ScrollableContent } from "./ScrollableContent";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { RenderToolbarTabContent } from "./RenderToolbarTabContent";
import { capitalize } from "@/utils/Common";
import SvgIcon from "../common/SvgIcon";
import { Button } from "../base";
import { useToolbar } from "@/contexts/ToolbarContext";

interface ClassicToolbarProps {
  onToolbarChange?: (toolbarType: string) => void;
  editor: Editor;
  activeTab: TTabKey;
  setActiveTab: (tab: TTabKey) => void;
}

export const ClassicToolbar = ({
  onToolbarChange,
  editor,
  activeTab,
  setActiveTab,
}: ClassicToolbarProps) => {
  const { CLASSIC } = TOOLBAR_TYPES;
  const { editorConfig } = useToolbar();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const {
    contentScrollerRef,
    showScrollButtons,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    handleScrollLeft,
    handleScrollRight,
  } = useHorizontalScroll(activeTab);

  return (
    <div
      className="flex items-center gap-2 bg-white w-full justify-between px-4 py-2"
      style={{ height: `${CLASSIC.height}px` }}
    >
      <div className="flex flex-grow items-center gap-2">
        <Dropdown
          menu={{
            items: TABS.map((tab) => ({
              key: tab.toLowerCase(),
              label: capitalize(tab),
            })),
            onClick: ({ key }) => setActiveTab(capitalize(key) as TTabKey),
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
        <ScrollableContent
          contentScrollerRef={contentScrollerRef}
          showScrollButtons={showScrollButtons}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScroll={handleScroll}
          onScrollLeft={handleScrollLeft}
          onScrollRight={handleScrollRight}
          className="w-0"
        >
          <RenderToolbarTabContent activeTab={activeTab} editor={editor} />
        </ScrollableContent>
      </div>

      <div className="flex items-center gap-2">
        {editorConfig.onShare && (
          <Button title='Share' onClick={editorConfig.onShare} disabled={false} active={false}>
            <SvgIcon name='share' strokeWidth={3} />
          </Button>
        )}
        <ToolbarDropdown onToolbarChange={onToolbarChange} />
      </div>
    </div>
  );
};
