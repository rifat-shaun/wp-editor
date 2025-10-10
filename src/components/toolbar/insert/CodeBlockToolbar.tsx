import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { Select } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { LANGUAGES, THEMES } from '@/constants/CodeBlock';
import SvgIcon from '@/components/common/SvgIcon';
import { useCodeEditor } from '@/hooks/useCodeEditor';

interface NodeViewProps {
  node: ProseMirrorNode;
  updateAttributes: (attributes: Record<string, unknown>) => void;
  deleteNode: () => void;
}

export const CodeBlockToolbar = ({ node, updateAttributes, deleteNode}: NodeViewProps) => {
  const {
    selectedLanguage,
    selectedTheme,
    isCodeCopied,
    syntaxHighlightedCode,
    updateCodeLanguage,
    updateCodeTheme,
    copyCodeToClipboard,
    deleteCodeBlock,
    handleEditorEditableState,
  } = useCodeEditor({ node, updateAttributes, deleteNode });

  return (
    <NodeViewWrapper className="code-block-wrapper">
      <div 
        className={`code-block-toolbar theme-${selectedTheme}`}
        contentEditable={false}
      >
        <div className="code-block-toolbar-left">
          <Select
            value={selectedLanguage}
            onChange={updateCodeLanguage}
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
            onOpenChange={handleEditorEditableState}
          />
          <Select
            value={selectedTheme}
            onChange={updateCodeTheme}
            options={THEMES}
            className="code-block-theme-select"
            style={{ width: 150 }}
            size="small"
            placeholder="Select theme"
            getPopupContainer={() => document.body}
            onOpenChange={handleEditorEditableState}
          />
        </div>
        <div className="code-block-toolbar-actions">
          <button
            onClick={copyCodeToClipboard}
            onMouseDown={(e) => e.stopPropagation()}
            className="code-block-action-btn"
            title={isCodeCopied ? "Copied!" : "Copy Code"}
          >
            <SvgIcon 
              name={isCodeCopied ? "check" : "copy"} 
              size={18} 
              className={isCodeCopied ? "text-green-400" : ""} 
              strokeWidth={3} 
            />
          </button>
          <button
            onClick={deleteCodeBlock}
            onMouseDown={(e) => e.stopPropagation()}
            className="code-block-action-btn code-block-delete-btn"
            title="Delete Code Block"
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
      <pre className={`code-block-content theme-${selectedTheme} wrapped`}>
        <code 
          className="hljs"
          dangerouslySetInnerHTML={{ __html: syntaxHighlightedCode }}
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

