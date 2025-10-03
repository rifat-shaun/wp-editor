import type { ReactNode } from "react";
import SvgIcon from "../common/SvgIcon";

interface ScrollableContentProps {
  contentScrollerRef: React.RefObject<HTMLDivElement>;
  showScrollButtons: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScroll: () => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  children: ReactNode;
  className?: string;
}

export const ScrollableContent = ({
  contentScrollerRef,
  showScrollButtons,
  canScrollLeft,
  canScrollRight,
  onScroll,
  onScrollLeft,
  onScrollRight,
  children,
  className = "",
}: ScrollableContentProps) => {
  return (
    <div className={`relative flex-grow flex items-center ${className}`}>
      {showScrollButtons && canScrollLeft && (
        <button
          onClick={onScrollLeft}
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
        onScroll={onScroll}
      >
        <div className="w-full flex items-center space-x-2">{children}</div>
      </div>
      {showScrollButtons && canScrollRight && (
        <button
          onClick={onScrollRight}
          className="absolute right-0 bottom-0 z-10 bg-gray-100 px-0.5 rounded-sm shadow-sm hover:bg-primary-500 hover:text-white h-full flex items-center"
          aria-label="Scroll right"
        >
          <SvgIcon name="arrow-down" className="rotate-[-90deg]" />
        </button>
      )}
    </div>
  );
};
