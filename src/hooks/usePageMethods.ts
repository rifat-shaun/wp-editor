import type { PageConfig } from "@/components/toolbar/page/PageSizeSelector";
import { PAGE_BACKGROUND_COLORS } from "@/constants/PageBackground";
import { useEditorShell } from "@/contexts/EditorShellContext";
import { useState, useEffect } from "react";

export interface MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const DEFAULT_MARGINS: MarginValues = {
  top: 1,
  right: 1,
  bottom: 1,
  left: 1,
};

export const PRESET_MARGINS = {
  Normal: { top: 1, right: 1, bottom: 1, left: 1 },
  Narrow: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
  Moderate: { top: 1.25, right: 1.25, bottom: 1.25, left: 1.25 },
  Wide: { top: 1.75, right: 1.75, bottom: 1.75, left: 1.75 },
  Mirrored: { top: 1.25, right: 1, bottom: 1.25, left: 2 },
};

const MIN_MARGIN = 0;
const MAX_MARGIN = 3;
const MARGIN_STEP = 0.25;

export const usePageMethods = () => {
	const { editor } = useEditorShell();
  const [selectedBGColor, setSelectedBGColor] = useState(PAGE_BACKGROUND_COLORS[0].value);

	const handleSetPageBackgroundColor = (color: string) => {
		setSelectedBGColor(color);
		editor.chain().focus().setPageBackgroundColor(color).run();
	}
  
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    size: "A4",
    orientation: "portrait",
  });

  // Store orientation in data attribute for export
  useEffect(() => {
    document.body.setAttribute('data-page-orientation', pageConfig.orientation);
  }, [pageConfig.orientation]);

  const getPageClass = (config: PageConfig) => {
    const { size, orientation } = config;
    const baseClass = `page-${size.toLowerCase()}`;
    return orientation === "landscape" ? `${baseClass}-landscape` : baseClass;
  };

  const handleInsertPageBreak = () => {
    editor.chain().focus().setPageBreak().run();
  }

  // Margin-related state and logic
  const [margins, setMargins] = useState<MarginValues>(DEFAULT_MARGINS);
  const [inputValues, setInputValues] = useState<Record<keyof MarginValues, string>>({
    top: '1',
    right: '1',
    bottom: '1',
    left: '1',
  });

  // Load margins from data attribute on mount
  useEffect(() => {
    const marginsAttr = document.body.getAttribute('data-page-margins');
    if (marginsAttr) {
      try {
        const currentMargins = JSON.parse(marginsAttr);
        setMargins(currentMargins);
        setInputValues({
          top: currentMargins.top.toString(),
          right: currentMargins.right.toString(),
          bottom: currentMargins.bottom.toString(),
          left: currentMargins.left.toString(),
        });
      } catch (e) {
        console.error('Error parsing page margins data attribute:', e);
      }
    }
  }, []);

  const handleMarginInputChange = (side: keyof MarginValues, value: string) => {
    // Allow empty value for clearing
    setInputValues((prev) => ({
      ...prev,
      [side]: value,
    }));

    // Only update margin values if the input is valid
    if (value === '') return;

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    // Ensure value is not below min and doesn't exceed max
    const validValue = Math.min(Math.max(MIN_MARGIN, numValue), MAX_MARGIN);

    setMargins((prev) => ({
      ...prev,
      [side]: validValue,
    }));
  };

  const handleMarginInputBlur = (side: keyof MarginValues) => {
    // If value is empty or invalid, set to minimum value (0)
    const value = inputValues[side];
    if (value === '' || isNaN(Number(value))) {
      const newValue = '0';
      setInputValues((prev) => ({
        ...prev,
        [side]: newValue,
      }));
      setMargins((prev) => ({
        ...prev,
        [side]: 0,
      }));
    }
  };

  const handleMarginKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, side: keyof MarginValues) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();

      // Get the current value from margins (which is guaranteed to be a number)
      const currentValue = margins[side];

      let newValue: number;
      if (event.key === 'ArrowUp') {
        newValue = Math.min(currentValue + MARGIN_STEP, MAX_MARGIN);
      } else {
        newValue = Math.max(currentValue - MARGIN_STEP, MIN_MARGIN);
      }

      // Update both margins and input values
      setMargins((prev) => ({
        ...prev,
        [side]: newValue,
      }));

      setInputValues((prev) => ({
        ...prev,
        [side]: newValue.toString(),
      }));
    }
  };

  const applyPresetMargins = (presetName: keyof typeof PRESET_MARGINS) => {
    const presetMargins = PRESET_MARGINS[presetName];
    setMargins({ ...presetMargins });

    // Update input values when applying presets
    setInputValues({
      top: presetMargins.top.toString(),
      right: presetMargins.right.toString(),
      bottom: presetMargins.bottom.toString(),
      left: presetMargins.left.toString(),
    });

    // Use the PageMargin extension command to apply preset margins
    if (editor && editor.commands.setPresetMargins) {
      editor.commands.setPresetMargins(presetName);
    }
  };

  const resetMarginsToDefault = (setPageOrientation: (orientation: 'portrait' | 'landscape') => void) => {
    setMargins({ ...DEFAULT_MARGINS });

    // Update input values when resetting
    setInputValues({
      top: DEFAULT_MARGINS.top.toString(),
      right: DEFAULT_MARGINS.right.toString(),
      bottom: DEFAULT_MARGINS.bottom.toString(),
      left: DEFAULT_MARGINS.left.toString(),
    });

    setPageOrientation('portrait');

    // Use the PageMargin extension command to reset margins
    if (editor && editor.commands.resetPageMargins) {
      editor.commands.resetPageMargins();
    }
  };

  const applyMargins = (onClose?: () => void) => {
    // Use the PageMargin extension commands to apply margins
    if (editor && editor.commands.setPageMargins) {
      editor.commands.setPageMargins({
        top: margins.top,
        right: margins.right,
        bottom: margins.bottom,
        left: margins.left,
      });
    }
    onClose?.();
  };

  return {
    pageClass: getPageClass(pageConfig),
    selectedBGColor,
    handleSetPageBackgroundColor,
    pageConfig,
    setPageConfig,
    handleInsertPageBreak,
    // Margin methods
    margins,
    inputValues,
    handleMarginInputChange,
    handleMarginInputBlur,
    handleMarginKeyDown,
    applyPresetMargins,
    resetMarginsToDefault,
    applyMargins,
  };
};
