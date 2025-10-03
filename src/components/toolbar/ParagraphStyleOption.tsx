import { Editor } from "@tiptap/react";
import { ItemGroup } from "./ItemGroup";
import { ToolbarButtonItem } from "./ToolbarButtonItem";
import SvgIcon from "@/components/common/SvgIcon";
import { useParagraphStyleMethods } from "@/hooks/useParagraphStyleMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { Dropdown, Space, Tooltip } from "antd";
import { useState } from "react";
import { ListTypeDropdownContent } from "./ListTypeDropdownContent";
import { ArrowDropDownOutlined } from "@mui/icons-material";

type TParagraphStyleOptionsProps = {
  editor: Editor;
};

export const ParagraphStyleOptions = ({
  editor,
}: TParagraphStyleOptionsProps) => {
  // const handleLineHeightChange = (lineHeight: string | number) => {
  //   if (
  //     editor.commands.setLineHeight as unknown as (
  //       _lineHeight: string | number
  //     ) => void
  //   ) {
  //     editor.chain().focus().setLineHeight(String(lineHeight)).run();
  //   }
  // };

  const { isTaskList, canIndent, canOutdent, isOrderedList } =
    useTiptapEditorState(editor);
  const {
    handleToggleTaskList,
    handleIndent,
    handleOutdent,
    handleToggleOrderedList,
  } = useParagraphStyleMethods(editor);

  const [orderedListDropdownOpen, setOrderedListDropdownOpen] = useState(false);

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

        <ToolbarButtonItem
          tooltip={"Bullet List"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          size="small"
        >
          <SvgIcon name="bullet-list" />
        </ToolbarButtonItem>

        <Space.Compact
          className={`flex items-center ${isOrderedList ? "bg-black-100" : ""}`}
        >
          <ToolbarButtonItem
            tooltip={"Numbered List"}
            onClick={handleToggleOrderedList}
            active={false}
            size="small"
          >
            <SvgIcon name="ordered-list" />
          </ToolbarButtonItem>

          <Tooltip
            title="Numbered list menu"
            placement="top"
            arrow={false}
            color="black"
            mouseEnterDelay={0.3}
          >
            <Dropdown
              popupRender={() => (
                <ListTypeDropdownContent
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

        <ToolbarButtonItem
          tooltip={"Checklist"}
          onClick={handleToggleTaskList}
          disabled={false}
          active={isTaskList}
          size="small"
        >
          <SvgIcon name="task-list" />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Increase Indent"}
          onClick={handleIndent}
          disabled={!canIndent}
          active={false}
          size="small"
        >
          <SvgIcon name="indent" />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Decrease Indent"}
          onClick={handleOutdent}
          disabled={!canOutdent}
          active={false}
          size="small"
        >
          <SvgIcon name="indent" className="rotate-180" />
        </ToolbarButtonItem>
      </div>

      <div className="flex items-center space-x-2">
        {/* <ToolbarButtonItem
          tooltip={'Align Left'}
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
          active={!editor.isActive({ textAlign: 'center' }) && !editor.isActive({ textAlign: 'right' }) && !editor.isActive({ textAlign: 'justify' })}
          size='small'
        >
          <SvgIcon name='align-left' />
        </ToolbarButtonItem> */}

        {/* <ToolbarButtonItem
          tooltip={'Align Center'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          size='small'
        >
          <SvgIcon name='align-center' />
        </ToolbarButtonItem> */}

        {/* <ToolbarButtonItem
          tooltip={'Align Right'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          size='small'
        >
          <SvgIcon name='align-right' />
        </ToolbarButtonItem> */}

        {/* <ToolbarButtonItem
          tooltip={'Justify'}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          size='small'
        >
          <SvgIcon name='align-justify' />
        </ToolbarButtonItem> */}

        {/* <ToolbarButtonItem
          tooltip={'Blockquote'}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          size='small'
        >
          <SvgIcon name='quote' />
        </ToolbarButtonItem> */}

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
