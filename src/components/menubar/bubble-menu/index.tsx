import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { EditorState } from "@tiptap/pm/state";
import { DefaultBubbleMenuContent } from "./DefaultBubbleMenuContent";
import { LinkMenuContent } from "./LinkMenuContent";
import { ImageMenuContent } from "@/components/menubar/bubble-menu/ImageMenuContent";

export const BubbleMenus = ({ editor }: { editor: Editor }) => {
  const shouldShowDefaultBubbleMenu = ({ state }: { state: EditorState }) => {
    if (editor.isActive("image") || editor.isActive("codeBlock")) {
      return false;
    }
    const { from, to } = state.selection;
    if (from !== to && !editor.isActive("link")) {
      return true;
    }
    return false;
  };

  return (
    <>
      <BubbleMenu
        editor={editor}
        shouldShow={shouldShowDefaultBubbleMenu}
        options={{ placement: "bottom", shift: { crossAxis: true } }}
      >
        <DefaultBubbleMenuContent />
      </BubbleMenu>

      <BubbleMenu
        editor={editor}
        shouldShow={() => editor.isActive("link")}
        options={{ placement: "bottom", shift: { crossAxis: true } }}
      >
        <LinkMenuContent />
      </BubbleMenu>

      <BubbleMenu
        editor={editor}
        shouldShow={() => editor.isActive("image")}
        options={{ placement: "top", shift: { crossAxis: true } }}
      >
        <ImageMenuContent />
      </BubbleMenu>
    </>
  );
};
