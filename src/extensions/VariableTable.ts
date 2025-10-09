import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';

export const VariableTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-table-id': {
        default: null,
      },
      'data-table-name': {
        default: null,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['table', HTMLAttributes, 0];
  },
});

export const VariableTableRow = TableRow.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-table-id': { default: null },
      'data-row-id': { default: null },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['tr', HTMLAttributes, 0];
  },
});

export const VariableTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-table-id': { default: null },
      'data-header-id': { default: null },
      'data-column-selected': { default: null },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['th', HTMLAttributes, 0];
  },
});

export const VariableTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-table-id': { default: null },
      'data-cell-id': { default: null },
      'data-column-selected': { default: null },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['td', HTMLAttributes, 0];
  },
});
