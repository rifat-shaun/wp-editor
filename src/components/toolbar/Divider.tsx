import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import { useToolbar } from "@/contexts/ToolbarContext";

export const Divider = () => {
  const { currentToolbar } = useToolbar();

  if (currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC) {
    return null;
  }

  return <div className="h-12 w-0.5 bg-neutral-300 !ml-4 !mr-2" />;
};
