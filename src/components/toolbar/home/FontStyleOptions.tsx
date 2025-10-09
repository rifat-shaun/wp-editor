import { Dropdown, InputNumber, Space } from "antd";
import { ItemGroup } from "../ItemGroup";
import { FONT_FAMILY_OPTIONS, FONT_SIZE_OPTIONS } from "@/constants/Fonts";
import {
  ArrowDropDownOutlined,
  EditOutlined,
  TitleOutlined,
} from "@mui/icons-material";
import { Editor } from "@tiptap/react";
import { Button } from "../../base/Button";
import { HorizontalLayoutColorPicker } from "../../base/ColorPicker";
import SvgIcon from "../../common/SvgIcon";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import { useFontStyleMethods } from "@/hooks/useFontStyleMethods";
import { FontSizeStepper } from "@/components/shared/FontSizeStepper";
import { BasicFontStyleOptions } from "@/components/shared/BasicFontStyleOptions";

export const FontStyleOptions = ({ editor }: { editor: Editor }) => {
  const {
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
    handleSuperscriptToggle,
    handleSubscriptToggle,
    handleSetColor,
    handleUnsetColor,
    handleSetBackgroundColor,
    handleUnsetBackgroundColor,
    handleSetHighlightColor,
    handleUnsetHighlightColor,
  } = useFontStyleMethods(editor);

  return (
    <ItemGroup>
      <div className="flex items-center space-x-2">
        <Dropdown
          menu={{
            items: FONT_FAMILY_OPTIONS.map((item) => ({
              label: (
                <span style={{ fontFamily: item.value }}>{item.label}</span>
              ),
              key: item.value,
              onClick: () => handleFontFamilyChange(item.value),
            })),
            style: { maxHeight: "256px", overflow: "auto" },
          }}
          className="border border-gray-300 rounded px-2 w-36 cursor-pointer"
        >
          <div className="flex items-center gap-1 justify-between h-6">
            <span className="text-sm truncate">
              {
                FONT_FAMILY_OPTIONS.find((item) => item.value === fontFamily)
                  ?.label
              }
            </span>
            <ArrowDropDownOutlined className="text-gray-500 hover:opacity-50" />
          </div>
        </Dropdown>

        <Space.Compact className="border cursor-pointer border-neutral-300 rounded hidden-spin h-6">
          <InputNumber
            value={fontSize}
            onChange={(value) => handleFontSizeChange(value)}
            min={6}
            max={128}
            variant="borderless"
            controls={false}
            rootClassName="w-11 h-6 flex items-center"
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
              <div className="w-14 max-h-64 rounded-md overflow-auto bg-white">
                {menu}
              </div>
            )}
          >
            <ArrowDropDownOutlined className="text-gray-500 hover:opacity-50" />
          </Dropdown>
        </Space.Compact>

        <FontSizeStepper editor={editor} />
      </div>

      <div className="flex items-center space-x-2">
        <BasicFontStyleOptions editor={editor} />

        <Button
          title="Superscript"
          onClick={handleSuperscriptToggle}
          disabled={!canSuperscript}
          active={isSuperscript}
        >
          <SvgIcon name="superscript" strokeWidth={1.5} />
        </Button>

        <Button
          title="Subscript"
          onClick={handleSubscriptToggle}
          disabled={!canSubscript}
          active={isSubscript}
        >
          <SvgIcon name="subscript" strokeWidth={1.5} />
        </Button>

        <HorizontalLayoutColorPicker
          id="selectionColor"
          showNone={false}
          value={selectionColor}
          icon={<TitleOutlined sx={{ fontSize: "15px" }} />}
          onColorSelect={(color) => handleSetColor(color)}
          onResetColor={handleUnsetColor}
        />

        <HorizontalLayoutColorPicker
          id="selectionBackgroundColor"
          showNone={false}
          value={selectionBackgroundColor}
          icon={<SvgIcon name="color-fill" />}
          onColorSelect={(color) => handleSetBackgroundColor(color)}
          onResetColor={handleUnsetBackgroundColor}
        />

        <HorizontalLayoutColorPicker
          id="selectionColor"
          showNone={false}
          value={highlightColor}
          icon={<EditOutlined sx={{ fontSize: "15px" }} />}
          onColorSelect={(color) => handleSetHighlightColor(color)}
          onResetColor={handleUnsetHighlightColor}
        />
      </div>
    </ItemGroup>
  );
};

