import { useState } from "react";
import SvgIcon from "@/components/common/SvgIcon";

interface LinkActionsModalProps {
  isOpen: boolean;
  position: { top: number; left: number };
  linkUrl: string;
  onEdit: () => void;
  onRemove: () => void;
  onCopy: () => void;
  onClose: () => void;
}

export const LinkActionsModal = ({
  isOpen,
  position,
  linkUrl,
  onEdit,
  onRemove,
  onCopy,
  onClose,
}: LinkActionsModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      <div
        className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: 'translateX(-50%)',
        }}
        onMouseLeave={onClose}
      >
        <div className="flex items-center px-3 py-2 space-x-3">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="flex-shrink-0 w-6 h-6 bg-gray-200 hover:text-primary-600 rounded-full flex items-center justify-center">
              <SvgIcon name="link" size={12} />
            </div>
            <a href={linkUrl} target="_blank" className="text-sm text-blue-600 truncate max-w-[200px]" title={linkUrl}>
              {linkUrl}
            </a>
          </div>

          <div className="h-5 w-px bg-gray-300"></div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleCopy}
              className={`p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors ${copied ? "text-green-600" : "text-gray-600"}`}
              title={copied ? "Copied!" : "Copy link"}
            >
              <SvgIcon name={copied ? "check" : "copy"} size={16} />
            </button>

            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors"
              title="Edit link"
            >
              <SvgIcon name="edit" size={16} />
            </button>

            <button
              onClick={onRemove}
              className="p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors"
              title="Remove link"
            >
              <SvgIcon name="node-delete" size={16} />
            </button>
          </div>
        </div>

        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-300"
          style={{ marginTop: '-1px' }}
        />
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white"
          style={{ marginTop: '-5px' }}
        />
      </div>
    </>
  );
};

