import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";

export interface ToolbarContextType {
  currentToolbar: string;
  setCurrentToolbar: (toolbar: string) => void;
  lastVisibleToolbar: string;
  setLastVisibleToolbar: (toolbar: string) => void;
  handleToolbarChange: (toolbarType: string) => void;
  handleShowToolbar: () => void;
  onPresentationModeToggle: () => void;
  pageConfig: PageConfig;
  setPageConfig: (config: PageConfig) => void;
}

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

interface ToolbarProviderProps {
  children: ReactNode;
  defaultToolbar?: string;
  onPresentationModeToggle: () => void;
  pageConfig: PageConfig;
  setPageConfig: (config: PageConfig) => void;
}

export const ToolbarProvider = ({
  children,
  defaultToolbar = TOOLBAR_TYPES_ENUM.PROFESSIONAL,
  onPresentationModeToggle,
  pageConfig,
  setPageConfig
}: ToolbarProviderProps) => {
  const { HIDE_TOOLBAR } = TOOLBAR_TYPES_ENUM;

  const [currentToolbar, setCurrentToolbar] = useState<string>(defaultToolbar);
  const [lastVisibleToolbar, setLastVisibleToolbar] =
    useState<string>(defaultToolbar);

  const handleToolbarChange = (toolbarType: string) => {
    // If hiding the toolbar, remember the current visible toolbar
    if (toolbarType === HIDE_TOOLBAR) {
      setLastVisibleToolbar(currentToolbar);
    }
    // If unhiding (switching from hide to a visible toolbar), update the last visible
    else if (currentToolbar !== HIDE_TOOLBAR) {
      setLastVisibleToolbar(toolbarType);
    }

    setCurrentToolbar(toolbarType);
  };

  const handleShowToolbar = () => {
    // Restore the last visible toolbar when unhiding
    setCurrentToolbar(lastVisibleToolbar);
  };

  return (
    <ToolbarContext.Provider
      value={{
        currentToolbar,
        setCurrentToolbar,
        lastVisibleToolbar,
        setLastVisibleToolbar,
        handleToolbarChange,
        handleShowToolbar,
        onPresentationModeToggle,
        pageConfig,
        setPageConfig
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
};

export const useToolbar = () => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
};