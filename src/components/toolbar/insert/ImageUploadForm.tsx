import { Button, Input } from "antd";
import type { Editor } from "@tiptap/react";
import { useImageUpload } from "../../../hooks/useImageUpload";

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
  const {
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
  } = useImageUpload({ editor, onSubmit, onCancel });

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
            disabled={!!imageUrl}
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
							file:mr-4 file:py-2 file:px-4
							file:rounded file:border-0
							file:text-sm file:font-semibold
							file:bg-blue-50 file:text-blue-700
							hover:file:bg-blue-100
							cursor-pointer"
          />
        </div>

        {/* Preview */}
        {(previewUrl || imageUrl) && (
          <div className="border rounded p-2 relative">
            <img
              src={previewUrl || imageUrl}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto"
            />
            <Button
              size="small"
              type="text"
              danger
              onClick={clearForm}
              className="absolute top-2 right-2 bg-gray-200"
            >
              ✕
            </Button>
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
            disabled={!!selectedFile}
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
