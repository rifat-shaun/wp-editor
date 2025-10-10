
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
import { ParagraphAlignmentOptions } from "@/components/shared/ParagraphAlignmentOptions";

export const ParagraphStyleOptions = () => {
  const {
    isTaskList,
    canIndent,
    canOutdent,
    isOrderedList,
    isUnorderedList,
    isBlockquote,
    canBlockquote,
  } = useTiptapEditorState();

  const {
    handleToggleTaskList,
    handleIndent,
    handleOutdent,
    handleToggleOrderedList,
    handleToggleUnorderedList,
    handleToggleBlockquote,
  } = useParagraphStyleMethods();

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
          title="Bullet list"
        >
          <Button
            onClick={handleToggleUnorderedList}
            active={false}
            size="small"
          >
            <SvgIcon name="bullet-list" />
          </Button>

          <Tooltip
            placement="top"
            arrow={false}
            color="black"
            mouseEnterDelay={0.3}
          >
            <Dropdown            
              popupRender={() => (
                <UnorderedListTypeDropdownContent
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
          title="Numbered list"
        >
          <Button
            onClick={handleToggleOrderedList}
            active={false}
            size="small"
          >
            <SvgIcon name="ordered-list" />
          </Button>

          <Tooltip
            // title="Numbered list menu"
            placement="top"
            arrow={false}
            color="black"
            mouseEnterDelay={0.3}
          >
            <Dropdown
              popupRender={() => (
                <OrderedListTypeDropdownContent
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
        <ParagraphAlignmentOptions />
        <Button
          title="Blockquote"
          onClick={handleToggleBlockquote}
          disabled={!canBlockquote}
          active={isBlockquote}
          size="small"
        >
          <SvgIcon name="quote" />
        </Button>
      </div>
    </ItemGroup>
  );
};

