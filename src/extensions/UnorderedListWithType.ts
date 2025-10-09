import { mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";

export type UnorderedListType =
  | "disc"
  | "circle"
  | "square"
  | "dash"
  | "arrow"
  | "checkmark";

export const UnorderedListWithType = BulletList.extend({
  name: "bulletList",

  addAttributes() {
    return {
      listType: {
        default: "disc",
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("data-list-type") || "disc";
        },
        renderHTML: (attributes: { listType?: string }) => {
          if (!attributes.listType || attributes.listType === "disc") {
            return {};
          }
          return {
            "data-list-type": attributes.listType,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "ul",
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === "string") return {};
          const element = node as HTMLElement;
          return {
            listType: element.getAttribute("data-list-type") || "disc",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
    return [
      "ul",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setBulletListType:
        (listType: UnorderedListType) =>
        ({ commands }: { commands: any }) => {
          return commands.updateAttributes("bulletList", { listType });
        },
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    unorderedListWithType: {
      setBulletListType: (listType: UnorderedListType) => ReturnType;
    };
  }
}

