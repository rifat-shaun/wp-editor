import { Editor } from "@tiptap/react";
import { HomeOptions } from "./HomeOptions";
import type { TTabKey } from "@/constants/Toolbar";
import { TableOptions } from "./table";
import { PageOptions } from "./page";
import { InsertOptions } from "./insert";

interface RenderToolbarTabContentProps {
  activeTab: TTabKey;
  editor: Editor;
}

export const RenderToolbarTabContent = ({
  activeTab,
  editor,
}: RenderToolbarTabContentProps) => {
  switch (activeTab) {
    case "Home":
      return <HomeOptions editor={editor} />;
    case "Insert":
      return <InsertOptions editor={editor} />;
    case "Table":
      return <TableOptions editor={editor} />;
    case "Page":
      return <PageOptions editor={editor} />;
    case "Export":
      return <div>Export</div>;
    default:
      return null;
  }
};
