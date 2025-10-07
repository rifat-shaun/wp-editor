import { Editor } from "@tiptap/react";
import { ItemGroup } from "../ItemGroup";
import { Button } from "@/components/base/Button";
import SvgIcon from "@/components/common/SvgIcon";
import { useParagraphStyleMethods } from "@/hooks/useParagraphStyleMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Dropdown, Space, Tooltip } from "antd";
import { useState } from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { UnorderedListTypeDropdownContent } from "./UnorderedListTypeDropdownContent";
import { OrderedListTypeDropdownContent } from "./OrderedListTypeDropdownContent";

type TParagraphStyleOptionsProps = {
  editor: Editor;
};

export const ParagraphStyleOptions = ({
  editor,
}: TParagraphStyleOptionsProps) => {
  const {
    isTaskList,
    canIndent,
    canOutdent,
    isOrderedList,
    isUnorderedList,
    isTextAlignJustify,
    isTextAlignCenter,
    isTextAlignRight,
    isTextAlignLeft,
    isBlockquote,
    canBlockquote,
  } = useTiptapEditorState(editor);

  const {
    handleToggleTaskList,
    handleIndent,
    handleOutdent,
    handleToggleOrderedList,
    handleToggleUnorderedList,
    handleTextAlignLeft,
    handleTextAlignCenter,
    handleTextAlignRight,
    handleTextAlignJustify,
    handleToggleBlockquote,
  } = useParagraphStyleMethods(editor);

  const [orderedListDropdownOpen, setOrderedListDropdownOpen] = useState(false);
  const [unorderedListDropdownOpen, setUnorderedListDropdownOpen] =
    useState(false);

  return (
    <ItemGroup>
      <div className="flex items-center space-x-2">
        {/* <ToolbarSelectItem
          options={lineHeightOptions}
          value={getSelectionLineHeight(editor)}
          onChange={handleLineHeightChange}
          dropdownClassName='min-w-[200px]'
          canInputManually={false}
          tooltip={'Line Spacing'}
          icon={
            <div className='flex items-center justify-center w-[28px] h-[28px]'>
              <SvgIcon name='line-height' />
            </div>
          }
        /> */}

        <Space.Compact
          className={`flex items-center ${isUnorderedList ? "bg-black-100" : ""
            }`}
        >
          <Button
            title="Bullet list"
            onClick={handleToggleUnorderedList}
            active={false}
            size="small"
          >
            <SvgIcon name="bullet-list" />
          </Button>

          <Tooltip
            title="Bullet list menu"
            placement="top"
            arrow={false}
            color="black"
            mouseEnterDelay={0.3}
          >
            <Dropdown
              popupRender={() => (
                <UnorderedListTypeDropdownContent
                  editor={editor}
                  onClose={() => setUnorderedListDropdownOpen(false)}
                />
              )}
              trigger={["click"]}
              open={unorderedListDropdownOpen}
              onOpenChange={setUnorderedListDropdownOpen}
            >
              <ArrowDropDownOutlined
                className="text-neutral-600 hover:opacity-75 hover:bg-black-100 cursor-pointer"
                sx={{ fontSize: "18px" }}
              />
            </Dropdown>
          </Tooltip>
        </Space.Compact>

        <Space.Compact
          className={`flex items-center ${isOrderedList ? "bg-black-100" : ""}`}
        >
          <Button
            title="Numbered list"
            onClick={handleToggleOrderedList}
            active={false}
            size="small"
          >
            <SvgIcon name="ordered-list" />
          </Button>

          <Tooltip
            title="Numbered list menu"
            placement="top"
            arrow={false}
            color="black"
            mouseEnterDelay={0.3}
          >
            <Dropdown
              popupRender={() => (
                <OrderedListTypeDropdownContent
                  editor={editor}
                  onClose={() => setOrderedListDropdownOpen(false)}
                />
              )}
              trigger={["click"]}
              open={orderedListDropdownOpen}
              onOpenChange={setOrderedListDropdownOpen}
            >
              <ArrowDropDownOutlined
                className="text-neutral-600 hover:opacity-75 hover:bg-black-100 cursor-pointer"
                sx={{ fontSize: "18px" }}
              />
            </Dropdown>
          </Tooltip>
        </Space.Compact>

        <Button
          title="Checklist"
          onClick={handleToggleTaskList}
          disabled={false}
          active={isTaskList}
          size="small"
        >
          <SvgIcon name="task-list" />
        </Button>

        <Button
          title="Increase Indent"
          onClick={handleIndent}
          disabled={!canIndent}
          active={false}
          size="small"
        >
          <SvgIcon name="indent" />
        </Button>

        <Button
          title="Decrease Indent"
          onClick={handleOutdent}
          disabled={!canOutdent}
          active={false}
          size="small"
        >
          <SvgIcon name="indent" className="rotate-180" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          title="Align Left"
          onClick={handleTextAlignLeft}
          active={isTextAlignLeft}
          size="small"
        >
          <SvgIcon name="align-left" />
        </Button>

        <Button
          title="Align Center"
          onClick={handleTextAlignCenter}
          active={isTextAlignCenter}
          size="small"
        >
          <SvgIcon name="align-center" />
        </Button>

        <Button
          title="Align Right"
          onClick={handleTextAlignRight}
          active={isTextAlignRight}
          size="small"
        >
          <SvgIcon name="align-right" />
        </Button>

        <Button
          title="Justify"
          onClick={handleTextAlignJustify}
          active={isTextAlignJustify}
          size="small"
        >
          <SvgIcon name="align-justify" />
        </Button>

        <Button
          title="Blockquote"
          onClick={handleToggleBlockquote}
          disabled={!canBlockquote}
          active={isBlockquote}
          size="small"
        >
          <SvgIcon name="quote" />
        </Button>

        {/* <ToolbarButtonItem
          tooltip={'Code'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          size='small'
        >
          <SvgIcon name='code' />
        </ToolbarButtonItem> */}
      </div>
    </ItemGroup>
  );
};
