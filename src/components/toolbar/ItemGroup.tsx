import { type ReactNode } from "react";

type ItemGroupProps = {
  children: ReactNode;
};

export const ItemGroup = ({ children }: ItemGroupProps) => {
  return <div className="flex flex-col items-start gap-1">{children}</div>;
};
