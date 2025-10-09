import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import { useToolbar } from "@/contexts/ToolbarContext";
import { type ReactNode } from "react";

type ItemGroupProps = {
  children: ReactNode;
};

export const ItemGroup = ({ children }: ItemGroupProps) => {
  const { currentToolbar } = useToolbar();

  const className =
    currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC
      ? "flex-row items-center"
      : "flex-col items-start";

  return <div className={`flex gap-1 ${className}`}>{children}</div>;
};
