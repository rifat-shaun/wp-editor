import { useEffect, useRef, useState } from "react";

interface UseHorizontalScrollReturn {
  contentScrollerRef: React.RefObject<HTMLDivElement>;
  showScrollButtons: boolean;
  scrollPosition: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  handleScroll: () => void;
  handleScrollLeft: () => void;
  handleScrollRight: () => void;
  checkContentOverflow: () => void;
}

export const useHorizontalScroll = (
  dependency?: unknown
): UseHorizontalScrollReturn => {
  const contentScrollerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [contentContainerWidth, setContentContainerWidth] = useState(0);
  const [totalContentWidth, setTotalContentWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

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
      const maxScroll = totalContentWidth - contentContainerWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + viewportWidth);
      contentScrollerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Check overflow when dependency changes (e.g., activeTab)
  useEffect(() => {
    if (dependency !== undefined) {
      setTimeout(checkContentOverflow, 100);
    }
  }, [dependency]);

  // Check overflow on mount and resize
  useEffect(() => {
    checkContentOverflow();
    const handleResize = () => checkContentOverflow();
    window.addEventListener("resize", handleResize);

    // ResizeObserver for more reliable content change detection
    const resizeObserver = new ResizeObserver(() => {
      checkContentOverflow();
    });

    if (contentScrollerRef.current) {
      resizeObserver.observe(contentScrollerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight =
    scrollPosition < totalContentWidth - contentContainerWidth;

  return {
    contentScrollerRef,
    showScrollButtons,
    scrollPosition,
    canScrollLeft,
    canScrollRight,
    handleScroll,
    handleScrollLeft,
    handleScrollRight,
    checkContentOverflow,
  };
};


