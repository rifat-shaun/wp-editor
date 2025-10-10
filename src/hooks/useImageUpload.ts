import { useState, useRef } from "react";
import { message } from "antd";
import type { Editor } from "@tiptap/react";

interface UseImageUploadProps {
  editor: Editor;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const useImageUpload = ({
  editor,
  onSubmit,
  onCancel,
}: UseImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        message.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        message.error("Image size should be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile && !imageUrl) {
      message.error("Please select an image or enter a URL");
      return;
    }

    setUploading(true);

    try {
      let finalUrl = imageUrl;

      // If a file is selected, use its preview URL (base64)
      // In production, you should upload to your server/CDN and use that URL
      if (selectedFile) {
        finalUrl = previewUrl;
        message.success("Image loaded successfully");
      }

      // Insert image into editor with default width and alignment
      editor
        .chain()
        .focus()
        .setImage({
          src: finalUrl,
          width: 300,
          align: "left" as "left" | "center" | "right",
        } as {
          src: string;
          alt?: string;
          title?: string;
          width?: number;
          align?: "left" | "center" | "right";
        })
        .run();

      // Clear form and close
      clearForm();
      onSubmit?.();
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Failed to insert image");
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setImageUrl("");
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      clearForm();
      onCancel?.();
    }
  };

  return {
    imageUrl,
    setImageUrl,
    selectedFile,
    previewUrl,
    uploading,
    fileInputRef,
    handleFileSelect,
    handleUpload,
    clearForm,
    handleKeyDown,
  };
};

