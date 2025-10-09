import type { ReactNode } from "react";
import SvgIcon from "../common/SvgIcon";
import { Button } from "../base";

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
        <Button
          onClick={onScrollLeft}
          title="Scroll left"
          className="absolute left-0 bottom-0 z-10 rounded-sm shadow-sm h-full flex items-center bg-neutral-200 hover:bg-primary-600 hover:text-white border border-neutral-300 hover:border-primary-600"
        >
          <SvgIcon name="arrow-down" className="rotate-90" strokeWidth={4} />
        </Button>
      )}
      <div
        ref={contentScrollerRef}
        className="overflow-x-auto overflow-y-hidden hide-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          marginLeft: showScrollButtons ? "2rem" : "0",
          marginRight: showScrollButtons ? "2rem" : "0",
          scrollBehavior: "smooth",
        }}
        onScroll={onScroll}
      >
        <div className="w-full flex items-center space-x-2">{children}</div>
      </div>
      {showScrollButtons && canScrollRight && (
        <Button
          onClick={onScrollRight}
          title="Scroll right"
          className="absolute right-0 bottom-0 z-10 rounded-sm shadow-sm h-full flex items-center bg-neutral-200 hover:bg-primary-600 hover:text-white border border-neutral-300 hover:border-primary-600"
        >
          <SvgIcon name="arrow-down" className="rotate-[-90deg]" strokeWidth={4} />
        </Button>
      )}
    </div>
  );
};
