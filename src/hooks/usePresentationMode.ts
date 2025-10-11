import { useState, useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";

export const usePresentationMode = (editor: Editor | null, containerRef?: React.RefObject<HTMLElement>) => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);

  const handleEnterPresentationMode = () => {
    setIsPresentationMode(true);
    editor?.setEditable(false);
    // Request fullscreen on the container element if provided, otherwise fall back to document.documentElement
    const targetElement = containerRef?.current || document.documentElement;
    targetElement.requestFullscreen?.();
  };

  const handleExitPresentationMode = useCallback(() => {
    setIsPresentationMode(false);
    setIsLaserActive(false);
    const targetElement = containerRef?.current || document.documentElement;
    targetElement.classList.remove('laser-active');
    editor?.setEditable(true);
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [editor, containerRef]);

  const handleLaserToggle = (isActive: boolean) => {
    setIsLaserActive(isActive);
    
    // Apply laser-active class to the container element for fullscreen cursor hiding
    const targetElement = containerRef?.current || document.documentElement;
    if (isActive) {
      targetElement.classList.add('laser-active');
    } else {
      targetElement.classList.remove('laser-active');
    }
  };

  const onPresentationModeToggle = () => {
    if (isPresentationMode) {
      handleExitPresentationMode();
    } else {
      handleEnterPresentationMode();
    }
  };

  useEffect(() => {
    const PRESENTATION_MODE_EXIT_EVENT = "fullscreenchange";
    
    const handlePresentationModeExit = () => {
      if (!document.fullscreenElement && isPresentationMode) {
        handleExitPresentationMode();
      }
    };

    document.addEventListener(PRESENTATION_MODE_EXIT_EVENT, handlePresentationModeExit);
    return () => {
      document.removeEventListener(PRESENTATION_MODE_EXIT_EVENT, handlePresentationModeExit);
    };
  }, [isPresentationMode, editor, handleExitPresentationMode]);

  return {
    isPresentationMode,
    isLaserActive,
    onPresentationModeToggle,
    handleLaserToggle,
  };
};
