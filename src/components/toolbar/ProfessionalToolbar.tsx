import { TOOLBAR_TYPES, TABS, type TTabKey } from "@/constants/Toolbar";
import { Editor } from "@tiptap/react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { ScrollableContent } from "./ScrollableContent";
import { ToolbarDropdown } from "./ToolbarDropdown";
import { RenderToolbarTabContent } from "./RenderToolbarTabContent";
interface ProfessionalToolbarProps {
  editor: Editor;
  onToolbarChange?: (toolbarType: string) => void;
  activeTab: TTabKey;
  setActiveTab: (tab: TTabKey) => void;
}

export const ProfessionalToolbar = ({
  editor,
  onToolbarChange,
  activeTab,
  setActiveTab,
}: ProfessionalToolbarProps) => {
  const { PROFESSIONAL } = TOOLBAR_TYPES;

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
      className="flex flex-col gap-0.5 bg-white w-full px-4 pt-1 pb-2"
      style={{ height: `${PROFESSIONAL.height}px` }}
    >
      <div className="flex items-center justify-between gap-2 mb-0.5">
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
        <ToolbarDropdown onToolbarChange={onToolbarChange} />
      </div>
      <ScrollableContent
        contentScrollerRef={contentScrollerRef}
        showScrollButtons={showScrollButtons}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScroll={handleScroll}
        onScrollLeft={handleScrollLeft}
        onScrollRight={handleScrollRight}
      >
        <RenderToolbarTabContent activeTab={activeTab} editor={editor} />
      </ScrollableContent>
    </div>
  );
};
