import { Node, InputRule } from '@tiptap/core';
import type { NodeViewRenderer } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export interface VariableOptions {
  enabled: boolean;
  variableValues: Record<string, string>;
}

interface VariableAttributes {
  variableName: string;
  value: string;
}

// Regex pattern for matching {{variableName}} syntax
const VARIABLE_PATTERN = /\{\{([a-zA-Z0-9_-]+)\}\}$/;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    variable: {
      /**
       * Insert a variable node at the current cursor position
       * @param variableName - The name/key of the variable
       */
      insertVariable: (variableName: string, value?: string) => ReturnType;
      /**
       * Update all variable nodes with new values
       * @param values - Record mapping variable names to their new values
       */
      updateVariableValues: (values: Record<string, string>) => ReturnType;
    };
  }
}

/**
 * VariableText Extension
 * 
 * Allows insertion and management of variable text nodes that can be dynamically updated.
 * Variables are displayed as {{variableName}} when no value is set, or as their actual value when set.
 * 
 * Features:
 * - Auto-conversion of {{variableName}} syntax when enabled
 * - Dynamic value updates via updateVariableValues command
 * - Inline, atomic nodes that can be deleted with backspace
 * 
 * @example
 * ```ts
 * editor.commands.insertVariable('userName');
 * editor.commands.updateVariableValues({ userName: 'John Doe' });
 * ```
 */
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

  addStorage() {
    return {
      variableValues: this.options.variableValues,
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
      value: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-value') || '',
        renderHTML: (attributes) => ({
          'data-value': attributes.value,
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
    const { variableName, value } = node.attrs as VariableAttributes;
    const displayText = value || `{{${variableName}}}`;

    return [
      'span',
      {
        'data-variable-name': variableName,
        'data-value': value,
        class: 'variable-text',
        contenteditable: 'false',
      },
      displayText,
    ];
  },

  addNodeView(): NodeViewRenderer {
    return ({ node }) => {
      const { variableName, value } = node.attrs as VariableAttributes;
      
      const dom = document.createElement('span');
      dom.className = 'variable-text';
      dom.contentEditable = 'false';
      dom.setAttribute('data-variable-name', variableName);
      dom.setAttribute('data-value', value);
      dom.textContent = value || `{{${variableName}}}`;

      return {
        dom,
        update: (updatedNode: ProseMirrorNode) => {
          if (updatedNode.type.name !== 'variableText') return false;
          
          const { variableName: newName, value: newValue } = updatedNode.attrs as VariableAttributes;
          
          // Update DOM only if values changed
          if (dom.getAttribute('data-value') !== newValue || dom.getAttribute('data-variable-name') !== newName) {
            dom.setAttribute('data-variable-name', newName);
            dom.setAttribute('data-value', newValue);
            dom.textContent = newValue || `{{${newName}}}`;
          }
          
          return true;
        },
      };
    };
  },

  addCommands() {
    return {
      insertVariable:
        (variableName: string, _value?: string) =>
        ({ commands }) => {
          // Get value from storage
          const value = _value || this.storage.variableValues[variableName] || '';
          
          return commands.insertContent({
            type: this.name,
            attrs: { 
              variableName,
              value,
            },
          });
        },

      updateVariableValues:
        (values: Record<string, string>) =>
        ({ tr, state, dispatch }) => {
          if (!dispatch) return false;

          // Update storage
          this.storage.variableValues = { ...this.storage.variableValues, ...values };

          let transaction = tr;
          let hasChanges = false;

          // Collect all positions that need updates (reverse order for correct position handling)
          const positions: number[] = [];
          state.doc.descendants((node, pos) => {
            if (node.type.name === 'variableText') {
              const { variableName, value: currentValue } = node.attrs as VariableAttributes;
              const newValue = values[variableName];

              if (newValue !== undefined && newValue !== currentValue) {
                positions.unshift(pos); // Add to front for reverse order
              }
            }
          });

          // Update nodes in reverse order to maintain correct positions
          positions.forEach((pos) => {
            const node = state.doc.nodeAt(pos);
            if (node) {
              const { variableName } = node.attrs as VariableAttributes;
              transaction = transaction.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                value: values[variableName],
              });
              hasChanges = true;
            }
          });

          if (!hasChanges) return false;

          // Don't add to undo history
          transaction = transaction.setMeta('addToHistory', false);
          
          dispatch(transaction);
          return true;
        },
    };
  },

  addInputRules() {
    if (!this.options.enabled) return [];

    return [
      new InputRule({
        find: VARIABLE_PATTERN,
        handler: ({ range, match, commands }) => {
          const variableName = match[1];
          if (!variableName) return;

          // Replace the matched text with a variable node
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
});
