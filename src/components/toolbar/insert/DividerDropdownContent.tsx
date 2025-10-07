import { Editor } from "@tiptap/react";
import { DIVIDER_LINE_TYPES } from "@/constants/DividerLineTypes";

interface DividerDropdownContentProps {
  editor: Editor;
  onClose: () => void;
}

export const DividerDropdownContent = ({
  editor,
  onClose,
}: DividerDropdownContentProps) => {
  const handleDividerClick = (type: string) => {
    editor.commands.setHorizontalRule({ styleType: type });
    onClose();
  };

  return (
    <div className="w-56">
      <div className="px-2 pb-2 text-sm font-medium text-gray-500 border-b">
        Divider Style
      </div>

      <div className="py-2 max-h-96 overflow-y-auto">
        {DIVIDER_LINE_TYPES.map((item) => (
          <div
            key={item.value}
            className="px-2 py-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
            onClick={() => handleDividerClick(item.value)}
          >
            <hr
              className={`hr--${item.value} !m-0`}
              style={{
                backgroundSize:
                  item.value === "wavy-line" ? "300% 8px" : "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
