import { useState, useEffect, useMemo, useCallback } from "react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { all, createLowlight } from "lowlight";
import { useEditorShell } from "@/contexts/EditorShellContext";

const lowlight = createLowlight(all);

interface LowlightNode {
  type: string;
  value?: string;
  properties?: { className?: string[] };
  children?: LowlightNode[];
}

interface CodeBlockAttributes {
  selectedLanguage: string;
  selectedTheme: string;
  isCodeCopied: boolean;
  syntaxHighlightedCode: string;
}

interface UseCodeEditorProps {
  node: ProseMirrorNode;
  updateAttributes: (attributes: Record<string, unknown>) => void;
  deleteNode: () => void;
}

interface UseCodeEditorReturn extends CodeBlockAttributes {
  updateCodeLanguage: (language: string) => void;
  updateCodeTheme: (theme: string) => void;
  copyCodeToClipboard: () => void;
  deleteCodeBlock: () => void;
  handleEditorEditableState: (isOpen: boolean) => void;
}

/**
 * Helper function to convert lowlight nodes to HTML
 */
const convertLowlightNodesToHtml = (nodes: LowlightNode[]): string => {
  return nodes
    .map((node: LowlightNode) => {
      if (node.type === "text") {
        return node.value || "";
      }

      if (node.type === "element") {
        const classes = node.properties?.className?.join(" ") || "";
        const children = node.children ? convertLowlightNodesToHtml(node.children) : "";
        return `<span class="${classes}">${children}</span>`;
      }

      return "";
    })
    .join("");
};

/**
 * Custom hook to manage code block editor functionality
 * Handles language selection, theme, syntax highlighting, copy, and delete operations
 */
export const useCodeEditor = ({
  node,
  updateAttributes,
  deleteNode,
}: UseCodeEditorProps): UseCodeEditorReturn => {
  const { editor } = useEditorShell();
  const [selectedLanguage, setSelectedLanguage] = useState(
    node.attrs.language || "plaintext"
  );
  const [selectedTheme, setSelectedTheme] = useState(node.attrs.theme || "dark");
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  // Update the language attribute in the code block
  const updateCodeLanguage = useCallback(
    (language: string) => {
      setSelectedLanguage(language);
      updateAttributes({ language });
    },
    [updateAttributes]
  );

  // Update the theme attribute in the code block
  const updateCodeTheme = useCallback(
    (theme: string) => {
      setSelectedTheme(theme);
      updateAttributes({ theme });
    },
    [updateAttributes]
  );

  // Copy code content to clipboard
  const copyCodeToClipboard = useCallback(() => {
    const codeContent = node.textContent;
    if (codeContent) {
      navigator.clipboard.writeText(codeContent);
      setIsCodeCopied(true);
      setTimeout(() => {
        setIsCodeCopied(false);
      }, 1500);
    }
  }, [node.textContent]);

  // Delete the code block node
  const deleteCodeBlock = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  // Handle editor editable state when dropdowns open/close
  const handleEditorEditableState = useCallback(
    (isDropdownOpen: boolean) => {
      if (isDropdownOpen) {
        editor.setEditable(false);
      } else {
        setTimeout(() => editor.setEditable(true), 10);
      }
    },
    [editor]
  );

  // Sync local state with node attributes when they change
  useEffect(() => {
    setSelectedLanguage(node.attrs.language || "plaintext");
    setSelectedTheme(node.attrs.theme || "dark");
  }, [node.attrs.language, node.attrs.theme]);

  // Generate syntax highlighted code using lowlight
  const syntaxHighlightedCode = useMemo(() => {
    const codeContent = node.textContent || "";
    if (!codeContent) return "";

    try {
      const highlightResult = lowlight.highlight(selectedLanguage, codeContent);
      return convertLowlightNodesToHtml(highlightResult.children);
    } catch {
      // If language is not supported, return plain text
      return codeContent;
    }
  }, [node.textContent, selectedLanguage]);

  return {
    selectedLanguage,
    selectedTheme,
    isCodeCopied,
    syntaxHighlightedCode,
    updateCodeLanguage,
    updateCodeTheme,
    copyCodeToClipboard,
    deleteCodeBlock,
    handleEditorEditableState,
  };
};

