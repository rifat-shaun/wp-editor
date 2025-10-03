import ListItem from "@tiptap/extension-list-item";
import { Node as ProseMirrorNode, NodeType } from "@tiptap/pm/model";
import { sinkListItem as pmSinkListItem, liftListItem as pmLiftListItem } from "@tiptap/pm/schema-list";
import { EditorState } from "@tiptap/pm/state";

export interface ListItemOptions {
  maxDepth: number;
}

/**
 * Calculate the depth of a list item by counting parent list nodes
 */
function getListDepth(pos: number, doc: ProseMirrorNode): number {
  let depth = 0;
  
  // Traverse up the document tree to count list nesting
  doc.nodesBetween(0, doc.content.size, (n, p) => {
    if (p < pos && p + n.nodeSize > pos) {
      if (n.type.name === "orderedList" || n.type.name === "bulletList") {
        depth++;
      }
    }
  });
  
  return depth;
}

export const ListItemWithDepthLimit = ListItem.extend<ListItemOptions>({
  name: "listItem",

  addOptions() {
    return {
      maxDepth: 9,
    };
  },

  addCommands() {
    return {
      sinkListItem:
        (typeOrName: string | NodeType) =>
        ({ state, dispatch }: { state: EditorState; dispatch: any }) => {
          const { $from } = state.selection;
          const nodeType = typeof typeOrName === "string" ? state.schema.nodes[typeOrName] : typeOrName;

          if (!nodeType) {
            return false;
          }

          // Find the current list item
          let listItemPos = -1;
          for (let d = $from.depth; d > 0; d--) {
            if ($from.node(d).type === nodeType) {
              listItemPos = $from.before(d);
              break;
            }
          }

          if (listItemPos === -1) {
            return false;
          }

          // Calculate current depth
          const currentDepth = getListDepth(listItemPos, state.doc);

          // Prevent nesting beyond maxDepth (clamped between 0-9)
          const maxDepth = Math.max(0, Math.min(9, this.options.maxDepth));
          if (currentDepth >= maxDepth) {
            return false;
          }

          // Call the original ProseMirror command
          return pmSinkListItem(nodeType)(state, dispatch);
        },
      liftListItem: (typeOrName: string | NodeType) => ({ state, dispatch }: { state: EditorState; dispatch: any }) => {
        const nodeType = typeof typeOrName === "string" ? state.schema.nodes[typeOrName] : typeOrName;
        return pmLiftListItem(nodeType)(state, dispatch);
      },
    };
  },
});

