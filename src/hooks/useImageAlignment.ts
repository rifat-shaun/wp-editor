import { useState, useEffect, useCallback } from "react";
import { ALIGNMENT_OPTIONS, type AlignType } from "@/constants/Common";
import { IMAGE_DEFAULT_WIDTH } from "@/constants/Image";
import { useEditorShell } from "@/contexts/EditorShellContext";

interface ImageAttributes {
  alignment: AlignType;
  width: number;
}

interface UseImageAlignmentReturn {
  currentImageAlignment: AlignType;
  currentImageWidth: number;
  updateImageAlignment: (alignment: AlignType) => void;
}

/**
 * Custom hook to manage image alignment in the editor
 * Tracks the currently selected image's alignment and provides methods to update it
 */
export const useImageAlignment = (): UseImageAlignmentReturn => {
  const { editor } = useEditorShell();
  const [selectedImageAttributes, setSelectedImageAttributes] = useState<ImageAttributes>({
    alignment: ALIGNMENT_OPTIONS.LEFT,
    width: IMAGE_DEFAULT_WIDTH,
  });

  // Extract image attributes from the currently selected node
  const extractImageAttributesFromSelection = useCallback((): ImageAttributes => {
    const { selection } = editor.state;
    const nodeWithAttrs = selection as {
      node?: {
        type: { name: string };
        attrs: { align?: AlignType; width?: number };
      };
    };

    const { node } = nodeWithAttrs;

    if (node && node.type.name === "image") {
      return {
        alignment: node.attrs.align || ALIGNMENT_OPTIONS.LEFT,
        width: node.attrs.width || IMAGE_DEFAULT_WIDTH,
      };
    }

    return {
      alignment: ALIGNMENT_OPTIONS.LEFT,
      width: IMAGE_DEFAULT_WIDTH,
    };
  }, [editor.state]);

  // Update the image alignment attribute in the editor
  const updateImageAlignment = useCallback(
    (alignment: AlignType) => {
      editor.chain().focus().updateAttributes("image", { align: alignment }).run();
    },
    [editor]
  );

  // Sync local state with editor state changes
  useEffect(() => {
    const syncImageAttributes = () => {
      setSelectedImageAttributes(extractImageAttributesFromSelection());
    };

    // Initial sync
    syncImageAttributes();

    // Subscribe to editor changes
    editor.on("transaction", syncImageAttributes);
    editor.on("selectionUpdate", syncImageAttributes);

    // Cleanup subscriptions
    return () => {
      editor.off("transaction", syncImageAttributes);
      editor.off("selectionUpdate", syncImageAttributes);
    };
  }, [editor, extractImageAttributesFromSelection]);

  return {
    currentImageAlignment: selectedImageAttributes.alignment,
    currentImageWidth: selectedImageAttributes.width,
    updateImageAlignment,
  };
};

