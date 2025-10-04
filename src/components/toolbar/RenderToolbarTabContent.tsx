import { Editor } from "@tiptap/react";
import { HomeOptions } from "./HomeOptions";
import type { TTabKey } from "@/constants/Toolbar";
import { TableOptions } from "./table";

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
      return <div>Insert</div>;
    case "Table":
      return <TableOptions editor={editor} />;
    case "Page":
      return <div>Page</div>;
    case "Export":
      return <div>Export</div>;
    default:
      return null;
  }
};
