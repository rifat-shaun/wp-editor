import { CropLandscape, CropPortrait } from '@mui/icons-material';
import { Editor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';

interface PageMarginPickerProps {
  editor: Editor;
  onClose?: () => void;
  pageOrientation: 'portrait' | 'landscape';
  setPageOrientation: (orientation: 'portrait' | 'landscape') => void;
}

interface MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const DEFAULT_MARGINS: MarginValues = {
  top: 1,
  right: 1,
  bottom: 1,
  left: 1,
};

const PRESET_MARGINS = {
  Normal: { top: 1, right: 1, bottom: 1, left: 1 },
  Narrow: { top: 0.5, right: 0.5, bottom: 0.5, left: 0.5 },
  Moderate: { top: 1.25, right: 1.25, bottom: 1.25, left: 1.25 },
  Wide: { top: 1.75, right: 1.75, bottom: 1.75, left: 1.75 },
  Mirrored: { top: 1.25, right: 1, bottom: 1.25, left: 2 },
};

export const PageMarginPicker: React.FC<PageMarginPickerProps> = ({ editor, onClose, pageOrientation, setPageOrientation }) => {
  const [margins, setMargins] = useState<MarginValues>(DEFAULT_MARGINS);
  const [inputValues, setInputValues] = useState<Record<keyof MarginValues, string>>({
    top: '1',
    right: '1',
    bottom: '1',
    left: '1',
  });

  useEffect(() => {
    const marginsAttr = document.body.getAttribute('data-page-margins');
    if (marginsAttr) {
      try {
        const currentMargins = JSON.parse(marginsAttr);
        setMargins(currentMargins);
        // Update input values when margins change
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

  const handleInputChange = (side: keyof MarginValues, value: string) => {
    // Allow empty value for clearing
    setInputValues((prev) => ({
      ...prev,
      [side]: value,
    }));

    // Only update margin values if the input is valid
    if (value === '') return;

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    // Min and max margin values in inches
    const MIN_MARGIN = 0;
    const MAX_MARGIN = 3;

    // Ensure value is not below min and doesn't exceed max
    const validValue = Math.min(Math.max(MIN_MARGIN, numValue), MAX_MARGIN);

    setMargins((prev) => ({
      ...prev,
      [side]: validValue,
    }));
  };

  const handleBlur = (side: keyof MarginValues) => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, side: keyof MarginValues) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();

      // Get the current value from margins (which is guaranteed to be a number)
      const currentValue = margins[side];
      const step = 0.25;

      let newValue: number;
      if (event.key === 'ArrowUp') {
        newValue = Math.min(currentValue + step, 3); // Max 3
      } else {
        newValue = Math.max(currentValue - step, 0); // Min 0
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

  const resetToDefault = () => {
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

  const applyMargins = () => {
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

  return (
    <div className='bg-white w-[300px]'>
      {/* Orientation */}
      <div className='mb-4'>
        <h4 className='text-xs font-medium mb-2'>Orientation</h4>
        <div className='flex space-x-3'>
          <button
            className={`border rounded p-2 flex flex-col items-center ${pageOrientation === 'portrait'
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-300 hover:bg-gray-100 text-gray-600'
              }`}
            onClick={() => {
              setPageOrientation('portrait');
            }}
            title='Portrait'
          >
            <CropPortrait fontSize='medium' className={pageOrientation === 'portrait' ? 'text-primary-500' : 'text-gray-500'} />
            <span className='text-xs mt-1 font-medium'>Portrait</span>
          </button>
          <button
            className={`border rounded p-2 flex flex-col items-center ${pageOrientation === 'landscape'
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-300 hover:bg-gray-100 text-gray-600'
              }`}
            onClick={() => {
              setPageOrientation('landscape');
            }}
            title='Landscape'
          >
            <CropLandscape fontSize='medium' className={pageOrientation === 'landscape' ? 'text-primary-500' : 'text-gray-500'} />
            <span className='text-xs mt-1 font-medium'>Landscape</span>
          </button>
        </div>
      </div>

      {/* Margins Controls */}

      <div className='mb-4'>
        <h4 className='text-xs font-medium mb-1'>Preset Margins</h4>
        <div className='grid grid-cols-2 gap-1'>
          {Object.entries(PRESET_MARGINS).map(([name]) => (
            <button
              key={name}
              className='text-xs py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded'
              onClick={() => applyPresetMargins(name as keyof typeof PRESET_MARGINS)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <div className='w-full flex gap-2 items-center justify-center'>
          <div className='flex items-center gap-1 justify-end'>
            <label className='text-xs text-gray-500'>Left</label>
            <div className='flex items-center'>
              <input
                type='text'
                value={inputValues.left}
                onChange={(e) => handleInputChange('left', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'left')}
                onBlur={() => handleBlur('left')}
                className='w-12 text-xs p-1 border border-gray-300 rounded'
              />
            </div>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <div className='flex flex-col items-center gap-0.5'>
              <label className='text-xs text-gray-500'>Top</label>
              <div className='flex items-center'>
                <input
                  type='text'
                  value={inputValues.top}
                  onChange={(e) => handleInputChange('top', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'top')}
                  onBlur={() => handleBlur('top')}
                  className='w-20 text-xs p-1 border border-gray-300 rounded'
                />
              </div>
            </div>

            <div className='flex items-center justify-center'>
              <div className={`relative ${pageOrientation === 'portrait' ? 'w-20 h-28' : 'w-28 h-20'} border border-gray-300 bg-white`}>
                {/* Visual representation of margins */}
                <div
                  className='absolute bg-gray-100 border border-dashed border-gray-300'
                  style={{
                    top: `${Math.min((margins.top / 5) * 100, 80)}%`,
                    left: `${Math.min((margins.left / 5) * 100, 80)}%`,
                    right: `${Math.min((margins.right / 5) * 100, 80)}%`,
                    bottom: `${Math.min((margins.bottom / 5) * 100, 80)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className='flex flex-col-reverse items-center gap-0.5'>
              <label className='text-xs text-gray-500'>Bottom</label>
              <div className='flex items-center'>
                <input
                  type='text'
                  value={inputValues.bottom}
                  onChange={(e) => handleInputChange('bottom', e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'bottom')}
                  onBlur={() => handleBlur('bottom')}
                  className='w-20 text-xs p-1 border border-gray-300 rounded'
                />
              </div>
            </div>
          </div>

          <div className='flex flex-row-reverse items-center gap-1 justify-start'>
            <label className='text-xs text-gray-500'>Right</label>
            <div className='flex items-center'>
              <input
                type='text'
                value={inputValues.right}
                onChange={(e) => handleInputChange('right', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'right')}
                onBlur={() => handleBlur('right')}
                className='w-12 text-xs p-1 border border-gray-300 rounded'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-between'>
        <button className='text-sm text-blue-600 hover:underline' onClick={resetToDefault}>
          Reset to Default
        </button>
        <div className='flex gap-2'>
          <button className='px-4 py-1 bg-gray-100 text-gray-700 rounded text-sm' onClick={onClose}>
            Cancel
          </button>
          <button className='px-4 py-1 bg-blue-600 text-white rounded text-sm' onClick={applyMargins}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
