import { Button } from '@/components/base';
import SvgIcon from '@/components/common/SvgIcon';
import { PAGE_BACKGROUND_COLORS } from '@/constants/PageBackground';
import { ArrowDropDownOutlined } from '@mui/icons-material';
import { Col, ColorPicker, Divider, Row, theme, type ColorPickerProps } from 'antd';
import React, { useState } from 'react';
import { useToolbar } from '@/contexts/ToolbarContext';
import { TOOLBAR_TYPES_ENUM } from '@/constants/Toolbar';
interface PageBackgroundColorPickerProps {
  id: string;
  selectedBGColor: string;
  setSelectedBGColor: (color: string) => void;
}

export const PageBackgroundColorPicker: React.FC<PageBackgroundColorPickerProps> = ({ id, selectedBGColor, setSelectedBGColor }) => {
  const { token } = theme.useToken();
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const [open, setOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedBGColor || "#FFFFFF"
  );

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handlePresetColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedBGColor(color);
    setOpen(false);
  };

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={13}>
        <div className=' bg-white rounded-md'>
          <div className='grid grid-cols-3 gap-2'>
            {PAGE_BACKGROUND_COLORS.map((color) => (
              <div
                key={color.value}
                className={`w-20 h-28 p-3 flex items-center justify-center text-center text-xs border rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${selectedBGColor === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                style={{
                  backgroundColor: color.value,
                  color: color.value === '#616161' ? 'white' : 'inherit',
                }}
                onClick={() => handlePresetColorSelect(color.value)}
              >
                {color.label}
              </div>
            ))}
          </div>
        </div></Col>
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
      styles={{ popupOverlayInner: { width: 500 } }}
      panelRender={customPanelRender}
      size="small"
      arrow={false}
      value={selectedColor}
      onChangeComplete={(color) => handleColorSelect(color.toHexString())}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedBGColor(selectedColor);
          setOpen(open);
        }
      }}
      placement="bottom"
    >
      <Button
        id={id}
        title="Background Color"
        onClick={() => setOpen(true)}
        size={isClassicToolbar ? "small" : "medium"}
      >
        {isClassicToolbar ? (
          <div className="relative flex items-center gap-1">
            <SvgIcon name="page-background" strokeWidth={1.5} />
            <span className="text-xs">Background</span>
            <ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <SvgIcon name="page-background" size={20} strokeWidth={1.5} />
              <ArrowDropDownOutlined sx={{ fontSize: "16px", color: "inherit" }} />
            </div>
            <span className="text-xs">Background</span>
          </div>
        )}
      </Button>
    </ColorPicker>
  );
};



