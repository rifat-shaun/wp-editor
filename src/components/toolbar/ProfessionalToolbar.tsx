import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  TOOLBAR_TYPES,
  TOOLBAR_MENU_ITEMS,
  TABS,
  type TTabKey,
} from "../../constants/Toolbar";
import { useEffect, useRef, useState } from "react";
import SvgIcon from "../common/SvgIcon";
import { Editor } from "@tiptap/react";
import { HomeOptions } from "./HomeOptions";

interface ProfessionalToolbarProps {
  editor: Editor;
  onToolbarChange?: (toolbarType: string) => void;
}

export const ProfessionalToolbar = ({
  editor,
  onToolbarChange,
}: ProfessionalToolbarProps) => {
  const { PROFESSIONAL } = TOOLBAR_TYPES;
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const contentScrollerRef = useRef<HTMLDivElement>(null);
  const editorToolbarWrapperRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TTabKey>(TABS[0]);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [contentContainerWidth, setContentContainerWidth] = useState(0);
  const [totalContentWidth, setTotalContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    onToolbarChange?.(key);
  };

  const checkContentOverflow = () => {
    if (contentScrollerRef.current && editorToolbarWrapperRef.current) {
      const scrollWidth = contentScrollerRef.current.scrollWidth;
      const clientWidth = editorToolbarWrapperRef.current.clientWidth;
      setTotalContentWidth(scrollWidth);
      setContentContainerWidth(clientWidth - 120);
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
      const maxScroll = totalContentWidth - contentContainerWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + viewportWidth);
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
      className="flex flex-col gap-0.5 bg-white w-full px-4 pt-1 pb-2"
      style={{ height: `${PROFESSIONAL.height}px` }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          {TABS.map((tab: TTabKey) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative mx-2 pb-0.5 text-xs font-medium text-gray-600 transition-all duration-300 border-b-2 hover:text-primary-400 ${
                activeTab === tab
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transition-all duration-300" />
              )}
            </button>
          ))}
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
      <div
        className="relative flex-grow flex items-center"
        ref={tabsContainerRef}
      >
        {showScrollButtons && (
          <button
            onClick={handleScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bottom-0 z-10 bg-gray-100 px-0.5 rounded-sm shadow-sm hover:bg-primary-500 hover:text-white h-15 flex items-center"
            aria-label="Scroll left"
            disabled={scrollPosition <= 0}
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
        {showScrollButtons && (
          <button
            onClick={handleScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bottom-0 z-10 bg-gray-100 px-0.5 rounded-sm shadow-sm hover:bg-primary-500 hover:text-white h-15 flex items-center"
            aria-label="Scroll right"
            disabled={
              scrollPosition >= totalContentWidth - contentContainerWidth
            }
          >
            <SvgIcon name="arrow-down" className="rotate-[-90deg]" />
          </button>
        )}
      </div>
    </div>
  );
};
