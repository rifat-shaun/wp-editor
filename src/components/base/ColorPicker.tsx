import { cyan, generate, green, presetPalettes, red } from "@ant-design/colors";
import { FormatColorFillOutlined } from "@mui/icons-material";
import { Col, ColorPicker, Divider, Row, theme } from "antd";
import type { ColorPickerProps } from "antd";

type Presets = Required<ColorPickerProps>["presets"][number];

function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
}

export const HorizontalLayoutColorPicker = () => {
  const { token } = theme.useToken();

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  });

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      defaultValue={token.colorPrimary}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      size="small"
    >
      <button className="relative flex items-center">
        <FormatColorFillOutlined
          className="text-gray-700"
          sx={{ fontSize: "21px" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            backgroundColor: "black",
          }}
        ></div>
      </button>
    </ColorPicker>
  );
};
