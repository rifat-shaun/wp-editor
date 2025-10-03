import TaskItem from "@tiptap/extension-task-item";
import { Node as ProseMirrorNode, NodeType } from "@tiptap/pm/model";
import { sinkListItem as pmSinkListItem, liftListItem as pmLiftListItem } from "@tiptap/pm/schema-list";
import { EditorState } from "@tiptap/pm/state";

export interface TaskItemOptions {
  maxDepth: number;
  nested: boolean;
}

/**
 * Calculate the depth of a task item by counting parent list nodes
 */
function getListDepth(pos: number, doc: ProseMirrorNode): number {
  let depth = 0;
  
  // Traverse up the document tree to count list nesting
  doc.nodesBetween(0, doc.content.size, (n, p) => {
    if (p < pos && p + n.nodeSize > pos) {
      if (n.type.name === "taskList" || n.type.name === "orderedList" || n.type.name === "bulletList") {
        depth++;
      }
    }
  });
  
  return depth;
}

export const TaskItemWithDepthLimit = TaskItem.extend<TaskItemOptions>({
  name: "taskItem",

  addOptions() {
    return {
      maxDepth: 9,
      nested: true,
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

          // Find the current task item
          let taskItemPos = -1;
          for (let d = $from.depth; d > 0; d--) {
            if ($from.node(d).type === nodeType) {
              taskItemPos = $from.before(d);
              break;
            }
          }

          if (taskItemPos === -1) {
            return false;
          }

          // Calculate current depth
          const currentDepth = getListDepth(taskItemPos, state.doc);

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

