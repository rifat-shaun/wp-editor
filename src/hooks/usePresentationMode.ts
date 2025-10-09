import { useState, useEffect, useCallback } from "react";
import type { Editor } from "@tiptap/react";

export const usePresentationMode = (editor: Editor | null) => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);

  const handleEnterPresentationMode = () => {
    setIsPresentationMode(true);
    editor?.setEditable(false);
    document.documentElement.requestFullscreen?.();
  };

  const handleExitPresentationMode = useCallback(() => {
    setIsPresentationMode(false);
    setIsLaserActive(false);
    document.documentElement.classList.remove('laser-active');
    editor?.setEditable(true);
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  }, [editor]);

  const handleLaserToggle = (isActive: boolean) => {
    setIsLaserActive(isActive);
    
    // Apply laser-active class to document element for fullscreen cursor hiding
    if (isActive) {
      document.documentElement.classList.add('laser-active');
    } else {
      document.documentElement.classList.remove('laser-active');
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
