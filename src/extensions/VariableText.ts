import { Node, InputRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface VariableOptions {
  enabled: boolean;
  variableValues: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variable: {
      insertVariable: (variableName: string) => ReturnType;
      updateVariableValues: (values: Record<string, string>) => ReturnType;
    };
  }
}

const variableTextPluginKey = new PluginKey('variableText');

export const VariableText = Node.create<VariableOptions>({
  name: 'variableText',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addOptions() {
    return {
      enabled: false,
      variableValues: {},
    };
  },

  addAttributes() {
    return {
      variableName: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-variable-name'),
        renderHTML: (attributes) => ({
          'data-variable-name': attributes.variableName,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-variable-name]',
      },
    ];
  },

  renderHTML({ node }) {
    const variableName = node.attrs.variableName;
    const variableValue = this.options.variableValues[variableName];
    const displayText = variableValue || `{{${variableName}}}`;

    return [
      'span',
      {
        'data-variable-name': variableName,
        class: 'variable-text',
        contenteditable: 'false',
      },
      displayText,
    ];
  },

  addCommands() {
    return {
      insertVariable:
        (variableName: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { variableName },
          });
        },

      updateVariableValues:
        (values: Record<string, string>) =>
        ({ tr, dispatch }) => {
          this.options.variableValues = { ...this.options.variableValues, ...values };

          if (dispatch) {
            const updatedTransaction = tr.setMeta(variableTextPluginKey, {
              type: 'update-values',
              values,
            });
            dispatch(updatedTransaction);
          }

          return true;
        },
    };
  },

  addInputRules() {
    if (!this.options.enabled) return [];

    const variablePattern = /\{\{([a-zA-Z0-9_-]+)\}\}$/;

    return [
      new InputRule({
        find: variablePattern,
        handler: ({ range, match, commands }) => {
          const variableName = match[1];
          if (!variableName) return;

          commands.deleteRange(range);
          commands.insertVariable(variableName);
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { selection } = editor.state;
        const { $from } = selection;

        // Check if cursor is right after a variable node
        const nodeBefore = $from.nodeBefore;
        if (nodeBefore && nodeBefore.type.name === this.name) {
          return editor.commands.deleteRange({
            from: $from.pos - nodeBefore.nodeSize,
            to: $from.pos,
          });
        }

        return false;
      },
    };
  },

  addProseMirrorPlugins() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const extension = this;

    return [
      new Plugin({
        key: variableTextPluginKey,

        appendTransaction(transactions, _oldState, newState) {
          const meta = transactions[0]?.getMeta(variableTextPluginKey);
          if (!meta || meta.type !== 'update-values') return null;

          const updatedTransaction = newState.tr;
          let hasChanges = false;

        newState.doc.descendants((node, pos) => {
          if (node.type.name === 'variableText') {
              const variableName = node.attrs.variableName;
              const newValue = extension.options.variableValues[variableName];
              
              // Force re-render by updating node markup
              if (newValue !== undefined) {
                updatedTransaction.setNodeMarkup(pos, undefined, node.attrs);
                hasChanges = true;
              }
            }
          });

          return hasChanges ? updatedTransaction : null;
        },
      }),
    ];
  },
});
