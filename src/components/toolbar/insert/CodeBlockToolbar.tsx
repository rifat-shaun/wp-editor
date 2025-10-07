import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import type { Editor } from '@tiptap/react';
import { LANGUAGES, THEMES } from '@/constants/CodeBlock';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

interface NodeViewProps {
  node: ProseMirrorNode;
  updateAttributes: (attributes: Record<string, unknown>) => void;
  deleteNode: () => void;
  editor: Editor;
}


interface LowlightNode {
  type: string;
  value?: string;
  properties?: { className?: string[] };
  children?: LowlightNode[];
}

// Helper function to convert lowlight nodes to HTML
const toHtml = (nodes: LowlightNode[]): string => {
  return nodes
    .map((node: LowlightNode) => {
      if (node.type === 'text') {
        return node.value || '';
      }
      
      if (node.type === 'element') {
        const classes = node.properties?.className?.join(' ') || '';
        const children = node.children ? toHtml(node.children) : '';
        return `<span class="${classes}">${children}</span>`;
      }
      
      return '';
    })
    .join('');
};

export const CodeBlockToolbar = ({ node, updateAttributes, deleteNode, editor }: NodeViewProps) => {
  const [language, setLanguage] = useState(node.attrs.language || 'plaintext');
  const [theme, setTheme] = useState(node.attrs.theme || 'dark');

  useEffect(() => {
    setLanguage(node.attrs.language || 'plaintext');
    setTheme(node.attrs.theme || 'dark');
  }, [node.attrs.language, node.attrs.theme]);

  // Highlight code using lowlight
  const highlightedCode = useMemo(() => {
    const code = node.textContent || '';
    if (!code) return '';
    
    try {
      const result = lowlight.highlight(language, code);
      return toHtml(result.children);
    } catch {
      // If language is not supported, return plain text
      return code;
    }
  }, [node.textContent, language]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    updateAttributes({ language: value });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    updateAttributes({ theme: value });
  };

  const handleCopy = () => {
    const code = node.textContent;
    navigator.clipboard.writeText(code).then(() => {
    //   toast.success('Code copied to clipboard!');
    });
  };

  const handleDelete = () => {
    deleteNode();
  };

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div 
        className={`code-block-toolbar theme-${theme}`}
        contentEditable={false}
      >
        <div className="code-block-toolbar-left">
          <Select
            value={language}
            onChange={handleLanguageChange}
            options={LANGUAGES}
            className="code-block-language-select"
            style={{ width: 150 }}
            size="small"
            showSearch
            placeholder="Select language"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            getPopupContainer={() => document.body}
            onOpenChange={(open) => {
              if (open) {
                editor.setEditable(false);
              } else {
                setTimeout(() => editor.setEditable(true), 10);
              }
            }}
          />
          <Select
            value={theme}
            onChange={handleThemeChange}
            options={THEMES}
            className="code-block-theme-select"
            style={{ width: 150 }}
            size="small"
            placeholder="Select theme"
            getPopupContainer={() => document.body}
            onOpenChange={(open) => {
              if (open) {
                editor.setEditable(false);
              } else {
                setTimeout(() => editor.setEditable(true), 10);
              }
            }}
          />
        </div>
        <div className="code-block-toolbar-actions">
          <button
            onClick={handleCopy}
            onMouseDown={(e) => e.stopPropagation()}
            className="code-block-action-btn"
            title="Copy Code"
          >
            <ContentCopyIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            onClick={handleDelete}
            onMouseDown={(e) => e.stopPropagation()}
            className="code-block-action-btn code-block-delete-btn"
            title="Delete Code Block"
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
      <pre className={`code-block-content theme-${theme} wrapped`}>
        <code 
          className="hljs"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{ 
            position: 'absolute', 
            pointerEvents: 'none', 
            top: 0, 
            left: 0, 
            padding: '16px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        />
        <code style={{ 
          color: 'transparent', 
          caretColor: '#d4d4d4',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}>
          <NodeViewContent />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};

