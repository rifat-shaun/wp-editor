import {
  COLOR_PICKER_PALETTE,
  COLOR_PICKER_STANDARD_COLORS,
} from "@/constants/Common";
import { FormatColorResetOutlined } from "@mui/icons-material";
import { Col, ColorPicker, Divider, Row, theme } from "antd";
import type { ColorPickerProps } from "antd";
import { useState, type ReactNode } from "react";

interface HorizontalLayoutColorPickerProps {
  id: string;
  value?: string;
  icon?: ReactNode;
  showNone?: boolean;
  onColorSelect: (color: string) => void;
  onResetColor?: () => void;
}

export const HorizontalLayoutColorPicker = ({
  id,
  value,
  icon,
  showNone = true,
  onColorSelect,
  onResetColor,
}: HorizontalLayoutColorPickerProps) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    value || "#FFFFFF"
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handlePresetColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect?.(color);
    setOpen(false);
  };

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <div className="mb-2">
          <div className="text-sm mb-1.5">Select Color</div>
          <div className="grid gap-1.5">
            {COLOR_PICKER_PALETTE.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1.5 justify-center">
                {row.map((color) => (
                  <button
                    key={color}
                    className={`w-4 h-4 rounded-sm hover:scale-[1.2] transition-transform ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    } ${color === "#FFFFFF" ? "border" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetColorSelect(color)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <div className="text-sm mb-1.5">Standard Colors</div>
          <div className="flex gap-1.5">
            {COLOR_PICKER_STANDARD_COLORS.map((color) => (
              <button
                key={color}
                className={`w-3.5 h-3.5 rounded-sm hover:scale-[1.2] transition-transform ${
                  selectedColor === color ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetColorSelect(color)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-1">
          {showNone && (
            <div
              className="flex items-center gap-0.5 text-sm cursor-pointer text-primary-400 hover:text-primary-700"
              onClick={() => handlePresetColorSelect("transparent")}
            >
              <FormatColorResetOutlined sx={{ fontSize: "18px" }} />
              None
            </div>
          )}

          {onResetColor && (
            <div
              className="text-sm cursor-pointer text-primary-400 hover:text-primary-700"
              onClick={() => {
                onResetColor();
                setOpen(false);
              }}
            >
              Reset
            </div>
          )}
        </div>
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      open={open}
      defaultValue={token.colorPrimary}
      styles={{ popupOverlayInner: { width: 420 } }}
      panelRender={customPanelRender}
      size="small"
      arrow={false}
      value={selectedColor}
      onChangeComplete={(color) => handleColorSelect(color.toHexString())}
      onOpenChange={(open) => {
        if (!open) {
          onColorSelect?.(selectedColor);
          setOpen(open);
        }
      }}
    >
      <button
        id={id}
        className="relative flex items-center"
        onClick={() => setOpen(true)}
      >
        {icon ? (
          <div className="flex flex-col items-center gap-px relative">
            {icon}
            <div
              className="h-[3px] w-full"
              style={{ backgroundColor: value }}
            />
          </div>
        ) : (
          <div
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: value }}
          />
        )}
      </button>
    </ColorPicker>
  );
};
