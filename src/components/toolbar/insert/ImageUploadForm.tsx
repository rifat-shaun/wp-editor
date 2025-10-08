import { useState, useRef } from "react";
import { Button, Input, message } from "antd";
import type { Editor } from "@tiptap/react";

interface ImageUploadFormProps {
  editor: Editor;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export const ImageUploadForm = ({
  editor,
  onSubmit,
  onCancel,
}: ImageUploadFormProps) => {
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
    // Insert image into editor
    editor.chain().focus().setImage({ src: previewUrl }).run();

    // Clear form and close
    clearForm();
    onSubmit?.();
    setUploading(false);
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

  return (
    <div className="min-w-[320px]">
      <div className="space-y-3">
        {/* File Upload Section */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
							file:mr-4 file:py-2 file:px-4
							file:rounded file:border-0
							file:text-sm file:font-semibold
							file:bg-blue-50 file:text-blue-700
							hover:file:bg-blue-100
							cursor-pointer"
          />
          {selectedFile && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="border rounded p-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto"
            />
          </div>
        )}

        {/* OR Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* URL Input Section */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            size="small"
            onClick={() => {
              clearForm();
              onCancel?.();
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={handleUpload}
            loading={uploading}
            disabled={!selectedFile && !imageUrl}
          >
            Insert Image
          </Button>
        </div>
      </div>
    </div>
  );
};
