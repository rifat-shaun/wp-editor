import { Dropdown, InputNumber, Select, Space, Tooltip } from "antd";
import { ItemGroup } from "./ItemGroup";
import { FONT_FAMILY_OPTIONS, FONT_SIZE_OPTIONS } from "@/constants/Fonts";
import {
  ChevronRight,
  EditOutlined,
  FormatBoldRounded,
  FormatItalicRounded,
  FormatUnderlinedRounded,
  SubscriptRounded,
  SuperscriptRounded,
  TextDecreaseOutlined,
  TextIncreaseOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import { Editor } from "@tiptap/react";
import { ToolbarButtonItem } from "./ToolbarButtonItem";
import { HorizontalLayoutColorPicker } from "../base/ColorPicker";
import { SvgIcon } from "@/index";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { useFontStyleMethods } from "@/hooks/useFontStyleMethods";

export const FontStyleOptions = ({ editor }: { editor: Editor }) => {
  const {
    canBold,
    isBold,
    canItalic,
    isItalic,
    canStrike,
    isStrike,
    canUnderline,
    isUnderline,
    fontFamily,
    fontSize,
    canSuperscript,
    isSuperscript,
    canSubscript,
    isSubscript,
    selectionColor,
    selectionBackgroundColor,
    highlightColor,
  } = useTiptapEditorState(editor);

  const {
    handleFontFamilyChange,
    handleFontSizeChange,
    increaseFontSize,
    decreaseFontSize,
    handleSuperscriptToggle,
    handleSubscriptToggle,
    handleToggleBold,
    handleToggleItalic,
    handleToggleUnderline,
    handleToggleStrike,
    handleSetColor,
    handleUnsetColor,
    handleSetBackgroundColor,
    handleUnsetBackgroundColor,
    handleSetHighlightColor,
    handleUnsetHighlightColor,
  } = useFontStyleMethods(editor);

  return (
    <ItemGroup>
      <div className="flex items-center space-x-1">
        <Tooltip
          title="Font Family"
          placement="top"
          arrow={false}
          color="black"
          mouseEnterDelay={0.3}
        >
          <Space.Compact className="border border-neutral-300 focus-within:border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded hidden-spin">
            <Select
              value={fontFamily}
              placeholder="Select Font Family"
              optionFilterProp="label"
              className={"w-48 h-6"}
              variant="borderless"
              options={FONT_FAMILY_OPTIONS.map((font) => ({
                value: font.value,
                label: (
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                ),
              }))}
              onChange={(value) => handleFontFamilyChange(value)}
            />
          </Space.Compact>
        </Tooltip>

        <Tooltip
          title="Font Size"
          placement="top"
          arrow={false}
          color="black"
          mouseEnterDelay={0.3}
        >
          <Space.Compact className="border border-neutral-300 focus-within:border focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 rounded hidden-spin">
            <InputNumber
              value={fontSize}
              onChange={(value) => handleFontSizeChange(value)}
              min={6}
              max={128}
              variant="borderless"
              controls={false}
              size="small"
              rootClassName="w-12 h-5 flex items-center"
            />
            <div className="w-1 h-6 border-l border-neutral-300"></div>
            <Dropdown
              menu={{
                items: FONT_SIZE_OPTIONS.map((item) => ({
                  label: item.label,
                  key: item.value,
                  onClick: () => handleFontSizeChange(item.value),
                })),
              }}
              placement="bottomRight"
              popupRender={(menu) => (
                <div className="w-12 max-h-64 rounded-md overflow-auto bg-white scrollbar-none">
                  {menu}
                </div>
              )}
            >
              <ChevronRight className="text-neutral-400 hover:opacity-75 rotate-90" />
            </Dropdown>
          </Space.Compact>
        </Tooltip>

        <ToolbarButtonItem
          tooltip={"Decrease Font Size"}
          onClick={decreaseFontSize}
          disabled={!editor.isEditable}
          active={false}
          size="small"
        >
          <TextDecreaseOutlined
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Increase Font Size"}
          onClick={increaseFontSize}
          disabled={!editor.isEditable}
          active={false}
          size="small"
        >
          <TextIncreaseOutlined
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>
      </div>

      <div className="flex items-center space-x-2">
        <ToolbarButtonItem
          tooltip={"Bold"}
          onClick={handleToggleBold}
          disabled={!canBold}
          active={isBold}
          size="small"
        >
          <FormatBoldRounded
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Italic"}
          onClick={handleToggleItalic}
          disabled={!canItalic}
          active={isItalic}
          size="small"
        >
          <FormatItalicRounded
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Underline"}
          onClick={handleToggleUnderline}
          disabled={!canUnderline}
          active={isUnderline}
          size="small"
        >
          <FormatUnderlinedRounded
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Strikethrough"}
          onClick={handleToggleStrike}
          disabled={!canStrike}
          active={isStrike}
          size="small"
        >
          <SvgIcon name="strikethrough" />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Superscript"}
          onClick={handleSuperscriptToggle}
          disabled={!canSuperscript}
          active={isSuperscript}
          size="small"
        >
          <SuperscriptRounded
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip={"Subscript"}
          onClick={handleSubscriptToggle}
          disabled={!canSubscript}
          active={isSubscript}
          size="small"
        >
          <SubscriptRounded
            className="text-gray-700"
            sx={{ fontSize: "18px" }}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip="Background Color"
          active={false}
          size="small"
          className="w-6"
        >
          <HorizontalLayoutColorPicker
            id="selectionColor"
            showNone={false}
            value={selectionColor}
            icon={<TitleOutlined sx={{ fontSize: "14px", padding: "0" }} />}
            onColorSelect={(color) => handleSetColor(color)}
            onResetColor={handleUnsetColor}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip="Background Color"
          active={false}
          size="small"
          className="w-6"
        >
          <HorizontalLayoutColorPicker
            id="selectionBackgroundColor"
            showNone={false}
            value={selectionBackgroundColor}
            icon={<SvgIcon name="color-fill" />}
            onColorSelect={(color) => handleSetBackgroundColor(color)}
            onResetColor={handleUnsetBackgroundColor}
          />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip="Highlight"
          active={false}
          size="small"
          className="w-6"
        >
          <HorizontalLayoutColorPicker
            id="selectionColor"
            showNone={false}
            value={highlightColor}
            icon={<EditOutlined sx={{ fontSize: "14px", padding: "0" }} />}
            onColorSelect={(color) => handleSetHighlightColor(color)}
            onResetColor={handleUnsetHighlightColor}
          />
        </ToolbarButtonItem>
      </div>
    </ItemGroup>
  );
};
