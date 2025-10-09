/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeAttributes } from "@tiptap/core";
import OrderedList from "@tiptap/extension-ordered-list";

export type OrderedListType =
  | "decimal"
  | "decimal-parenthesis"
  | "decimal-nested"
  | "upper-alpha-mixed"
  | "upper-roman-mixed"
  | "decimal-leading-zero-mixed";

export const OrderedListWithType = OrderedList.extend({
  name: "orderedList",

  addAttributes() {
    return {
      listType: {
        default: "decimal",
        parseHTML: (element: HTMLElement) => {
          return element.getAttribute("data-list-type") || "decimal";
        },
        renderHTML: (attributes: { listType?: string }) => {
          if (!attributes.listType || attributes.listType === "decimal") {
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
        tag: "ol",
        getAttrs: (node: string | HTMLElement) => {
          if (typeof node === "string") return {};
          const element = node as HTMLElement;
          return {
            listType: element.getAttribute("data-list-type") || "decimal",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    return [
      "ol",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setOrderedListType:
        (listType: OrderedListType) =>
        ({ commands }: { commands: any }) => {
          return commands.updateAttributes("orderedList", { listType });
        },
    };
  },
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    orderedListWithType: {
      setOrderedListType: (listType: OrderedListType) => ReturnType;
    };
  }
}
