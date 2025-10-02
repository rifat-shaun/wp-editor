import { Extension } from "@tiptap/core";

export interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const Indent = Extension.create<IndentOptions>({
  name: "indent",

  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote"],
      minLevel: 0,
      maxLevel: 8,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              const marginLeft = element.style.marginLeft;
              if (marginLeft) {
                return parseInt(marginLeft) / 30 || 0;
              }
              return 0;
            },
            renderHTML: (attributes) => {
              if (!attributes.indent) {
                return {};
              }
              return {
                style: `margin-left: ${attributes.indent * 30}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ state, dispatch, tr }) => {
          const { selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              if (currentIndent < this.options.maxLevel) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent + 1,
                });
              }
            }
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },

      outdent:
        () =>
        ({ state, dispatch, tr }) => {
          const { selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              if (currentIndent > this.options.minLevel) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent - 1,
                });
              }
            }
          });

          if (dispatch) {
            dispatch(tr);
          }

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        // Try list indentation first
        if (
          this.editor.can().sinkListItem("taskItem") ||
          this.editor.can().sinkListItem("listItem")
        ) {
          if (this.editor.isActive("taskItem")) {
            return this.editor.chain().focus().sinkListItem("taskItem").run();
          } else if (this.editor.isActive("listItem")) {
            return this.editor.chain().focus().sinkListItem("listItem").run();
          }
        }
        // Otherwise, indent paragraph
        return this.editor.commands.indent();
      },
      "Shift-Tab": () => {
        // Try list outdentation first
        if (
          this.editor.can().liftListItem("taskItem") ||
          this.editor.can().liftListItem("listItem")
        ) {
          if (this.editor.isActive("taskItem")) {
            return this.editor.chain().focus().liftListItem("taskItem").run();
          } else if (this.editor.isActive("listItem")) {
            return this.editor.chain().focus().liftListItem("listItem").run();
          }
        }
        // Otherwise, outdent paragraph
        return this.editor.commands.outdent();
      },
    };
  },
});

