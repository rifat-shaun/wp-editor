import type { OrderedListType } from "@/extensions/OrderedListWithType";
import { useParagraphStyleMethods } from "@/hooks/useParagraphStyleMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { LIST_TYPE_OPTIONS } from "@/utils/Paragraphs";
import { Editor } from "@tiptap/react";
import { SkeletonLine } from "@/components/common/SkeletonLine";

type ListTypeDropdownContentProps = {
  editor: Editor;
  onClose: () => void;
};

export const ListTypeDropdownContent = ({
  editor,
  onClose,
}: ListTypeDropdownContentProps) => {
  const { currentOrderedListType } = useTiptapEditorState(editor);
  const { handleListTypeChange } = useParagraphStyleMethods(editor);

  return (
    <div
      className="p-3 bg-white rounded shadow-lg border border-gray-200"
      style={{ minWidth: "300px" }}
    >
      {LIST_TYPE_OPTIONS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 mb-2 last:mb-0">
          {row.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                handleListTypeChange(option.key as OrderedListType);
                onClose();
              }}
              className={`flex-1 p-2 border rounded hover:border-primary-400 hover:bg-gray-50 transition-all ${
                editor.isActive("orderedList") &&
                currentOrderedListType === option.key
                  ? "border-primary-500 bg-primary-50 ring-1 ring-primary-200"
                  : "border-gray-300 bg-white"
              }`}
            >
              <div className="text-left text-xs leading-relaxed">
                <div className="text-gray-800 text-xs flex gap-1 items-center w-full">
                  {option.main[0]}
                  <SkeletonLine delay={0} />
                </div>
                <div className="text-gray-700 ml-5 text-xs flex gap-1 items-center w-[calc(100%_-_20px)]">
                  {option.nested[0]}
                  <SkeletonLine delay={0.1} />
                </div>
                <div className="text-gray-700 ml-5 text-xs flex gap-1 items-center w-[calc(100%_-_20px)]">
                  {option.nested[1]}
                  <SkeletonLine delay={0.2} />
                </div>
                <div className="text-gray-700 ml-10 text-xs flex gap-1 items-center w-[calc(100%_-_40px)]">
                  {option.deepNested[0]}
                  <SkeletonLine delay={0.3} />
                </div>
                <div className="text-gray-800 text-xs flex gap-1 items-center w-full">
                  {option.main[1]}
                  <SkeletonLine delay={0.4} />
                </div>
              </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
