import { Node, mergeAttributes } from '@tiptap/core';

export interface PageBreakOptions {
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      /**
       * Add a page break
       */
      setPageBreak: () => ReturnType;
    };
  }
}

export const PageBreak = Node.create<PageBreakOptions>({
  name: 'pageBreak',

  group: 'block',

  selectable: true,

  draggable: true,

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'editor-page-break',
      },
    };
  },

  addAttributes() {
    return {
      // You can add custom attributes here if needed
    };
  },

  parseHTML() {
    return [{ tag: 'hr[data-type="page-break"]' }, { tag: 'div[data-type="page-break"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'page-break' }),
      ['hr', { class: 'editor-page-break-line' }],
    ];
  },

  addCommands() {
    return {
      setPageBreak:
        () =>
        ({ chain }) => {
          return (
            chain()
              .insertContent({ type: this.name })
              // Set the selection after the page break
              .run()
          );
        },
    };
  },
});

export default PageBreak;
