import type { TTabKey } from "@/constants/Toolbar";
import { TableOptions } from "./table";
import { PageOptions } from "./page";
import { InsertOptions } from "./insert";
import { HomeOptions } from "./home";
import { ExportOptions } from "./export";

interface RenderToolbarTabContentProps {
  activeTab: TTabKey;
}

export const RenderToolbarTabContent = ({
  activeTab,
}: RenderToolbarTabContentProps) => {
  switch (activeTab) {
    case "Home":
      return <HomeOptions />;
    case "Insert":
      return <InsertOptions />;
    case "Table":
      return <TableOptions />;
    case "Page":
      return <PageOptions />;
    case "Export":
      return <ExportOptions />;
    default:
      return null;
  }
};
