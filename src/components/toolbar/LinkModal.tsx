import React from "react";

interface LinkModalProps {
  isOpen: boolean;
  position: { top: number; left: number };
  linkUrl: string;
  isEditing?: boolean;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export const LinkModal = ({
  isOpen,
  position,
  linkUrl,
  isEditing = false,
  onUrlChange,
  onKeyDown,
  onAdd,
  onCancel,
}: LinkModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onCancel} />

      <div
        className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-[300px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="flex flex-col space-y-2">
          <div className="text-xs font-medium text-gray-700 mb-1">
            {isEditing ? "Edit Link" : "Add Link"}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter URL (e.g., example.com)"
              value={linkUrl}
              onChange={onUrlChange}
              onKeyDown={onKeyDown}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onAdd}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              {isEditing ? "Save" : "Add"}
            </button>
            <button
              onClick={onCancel}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
