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
import { useEffect, useRef, useState } from "react";
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
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentScrollerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [contentContainerWidth, setContentContainerWidth] = useState(0);
  const [totalContentWidth, setTotalContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  const checkContentOverflow = () => {
    if (contentScrollerRef.current) {
      const scrollWidth = contentScrollerRef.current.scrollWidth;
      const clientWidth = contentScrollerRef.current.clientWidth;
      setTotalContentWidth(scrollWidth);
      setContentContainerWidth(clientWidth);
      setShowScrollButtons(scrollWidth > clientWidth);
    }
  };

  const handleScroll = () => {
    if (contentScrollerRef.current) {
      setScrollPosition(contentScrollerRef.current.scrollLeft);
    }
  };

  const handleScrollLeft = () => {
    if (contentScrollerRef.current) {
      const viewportWidth = contentScrollerRef.current.clientWidth;
      const newPosition = Math.max(0, scrollPosition - viewportWidth);
      contentScrollerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    if (contentScrollerRef.current) {
      const viewportWidth = contentScrollerRef.current.clientWidth;
      const newPosition = Math.min(
        totalContentWidth - contentContainerWidth,
        scrollPosition + viewportWidth
      );
      contentScrollerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    setTimeout(checkContentOverflow, 100);
  }, [activeTab]);

  useEffect(() => {
    checkContentOverflow();
    const handleResize = () => checkContentOverflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeOptions editor={editor} />;
      case "Insert":
        return <div>Insert</div>;
      case "Table":
        return <div>Table</div>;
      case "Page":
        return <div>Page</div>;
      case "Export":
        return <div>Export</div>;
      default:
        return null;
    }
  };

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
        <div
          className="relative flex flex-grow items-center w-[1px]"
          ref={tabsContainerRef}
        >
          {showScrollButtons && scrollPosition > 0 && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 bottom-0 z-10 bg-gray-100 px-0.5 rounded-sm shadow-sm hover:bg-primary-500 hover:text-white h-full flex items-center"
              aria-label="Scroll left"
            >
              <SvgIcon name="arrow-down" className="rotate-90" />
            </button>
          )}
          <div
            ref={contentScrollerRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              marginLeft: showScrollButtons ? "1.5rem" : "0",
              marginRight: showScrollButtons ? "1.5rem" : "0",
              scrollBehavior: "smooth",
            }}
            onScroll={handleScroll}
          >
            <div className="w-full flex items-center space-x-2">
              {renderTabContent()}
            </div>
          </div>
          {showScrollButtons && scrollPosition < totalContentWidth - contentContainerWidth && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 bottom-0 z-10 bg-gray-100 px-0.5 rounded-sm shadow-sm hover:bg-primary-500 hover:text-white h-full flex items-center"
              aria-label="Scroll right"
            >
              <SvgIcon name="arrow-down" className="rotate-[-90deg]" />
            </button>
          )}
        </div>
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
