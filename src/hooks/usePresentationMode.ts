import { useState, useEffect } from "react";
import type { Editor } from "@tiptap/react";

export const usePresentationMode = (editor: Editor | null) => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isLaserActive, setIsLaserActive] = useState(false);

  const handleEnterPresentationMode = () => {
    setIsPresentationMode(true);
    editor?.setEditable(false);
    document.documentElement.requestFullscreen?.();
  };

  const handleExitPresentationMode = () => {
    setIsPresentationMode(false);
    setIsLaserActive(false);
    document.documentElement.classList.remove('laser-active');
    editor?.setEditable(true);
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  };

  const handleLaserToggle = (isActive: boolean) => {
    setIsLaserActive(isActive);
    
    // Apply laser-active class to document element for fullscreen cursor hiding
    if (isActive) {
      document.documentElement.classList.add('laser-active');
    } else {
      document.documentElement.classList.remove('laser-active');
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
  }, [isPresentationMode, editor]);

  return {
    isPresentationMode,
    isLaserActive,
    enterPresentationMode: handleEnterPresentationMode,
    exitPresentationMode: handleExitPresentationMode,
    handleLaserToggle,
  };
};
