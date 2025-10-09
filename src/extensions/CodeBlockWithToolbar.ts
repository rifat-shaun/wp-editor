import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { all, createLowlight } from 'lowlight';
import { CodeBlockToolbar } from '../components/toolbar/insert/CodeBlockToolbar';

// Create lowlight instance
const lowlight = createLowlight(all);

export interface CodeBlockWithToolbarOptions {
  lowlight: ReturnType<typeof createLowlight>;
  defaultLanguage: string | null | undefined;
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    codeBlockWithToolbar: {
      /**
       * Set a code block with toolbar
       */
      setCodeBlock: (attributes?: { language: string; theme?: string }) => ReturnType;
      /**
       * Toggle a code block with toolbar
       */
      toggleCodeBlock: (attributes?: { language: string; theme?: string }) => ReturnType;
    };
  }
}

export const CodeBlockWithToolbar = Node.create<CodeBlockWithToolbarOptions>({
  name: 'codeBlock',
  
  content: 'text*',
  
  marks: '',
  
  group: 'block',
  
  code: true,
  
  defining: true,
  
  addOptions() {
    return {
      lowlight,
      defaultLanguage: null,
      HTMLAttributes: {},
    };
  },
  
  addAttributes() {
    return {
      language: {
        default: 'plaintext',
        parseHTML: element => element.getAttribute('data-language'),
        renderHTML: attributes => {
          if (!attributes.language) {
            return {};
          }
          return {
            'data-language': attributes.language,
          };
        },
      },
      theme: {
        default: 'dark',
        parseHTML: element => element.getAttribute('data-theme'),
        renderHTML: attributes => {
          return {
            'data-theme': attributes.theme || 'dark',
          };
        },
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
      },
    ];
  },
  
  renderHTML({ HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ['code', {}, 0],
    ];
  },
  
  addCommands() {
    return {
      setCodeBlock:
        attributes => ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleCodeBlock:
        attributes => ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockToolbar);
  },
});

