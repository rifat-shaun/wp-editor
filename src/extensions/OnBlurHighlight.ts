import { Extension } from "@tiptap/core";
import { Plugin, PluginKey, Transaction } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

const DECO_NAME = "onBlurHighlight";

const ACTION_TYPES = {
  BLUR: "blur",
  FOCUS: "focus",
} as const;

type ActionType = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

interface MetaData {
  from: number;
  to: number;
  action: ActionType;
}

export const OnBlurHighlight = Extension.create({
  name: DECO_NAME,

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(DECO_NAME),

        state: {
          init() {
            return DecorationSet.empty;
          },

          apply(tr: Transaction, oldState: DecorationSet) {
            // Type assertion instead of generic
            const decoTransform = tr.getMeta(DECO_NAME) as MetaData | undefined;
            const { selection, doc } = tr;
            const hasSelection = selection && selection.from !== selection.to;

            if (!hasSelection || decoTransform?.action === ACTION_TYPES.FOCUS) {
              return DecorationSet.empty;
            }

            if (hasSelection && decoTransform?.action === ACTION_TYPES.BLUR) {
              const decoration = Decoration.inline(
                selection.from,
                selection.to,
                {
                  class: "blur-highlight",
                }
              );
              return DecorationSet.create(doc, [decoration]);
            }

            return oldState;
          },
        },

        props: {
          decorations(state) {
            const pluginState = this.getState(state) as DecorationSet;
            return pluginState;
          },
          handleDOMEvents: {
            blur: (view: EditorView) => {
              const { tr } = view.state;

              const transaction = tr.setMeta(DECO_NAME, {
                from: tr.selection.from,
                to: tr.selection.to,
                action: ACTION_TYPES.BLUR,
              } as MetaData);

              view.dispatch(transaction);
              return false;
            },
            focus: (view: EditorView) => {
              const { tr } = view.state;

              const transaction = tr.setMeta(DECO_NAME, {
                from: tr.selection.from,
                to: tr.selection.to,
                action: ACTION_TYPES.FOCUS,
              } as MetaData);

              view.dispatch(transaction);
              return false;
            },
          },
        },
      }),
    ];
  },
});
