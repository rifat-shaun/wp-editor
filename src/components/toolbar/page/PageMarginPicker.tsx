import { CropLandscape, CropPortrait } from '@mui/icons-material';
import React from 'react';
import { usePageMethods, PRESET_MARGINS } from '@/hooks/usePageMethods';

interface PageMarginPickerProps {
  onClose?: () => void;
  pageOrientation: 'portrait' | 'landscape';
  setPageOrientation: (orientation: 'portrait' | 'landscape') => void;
}

export const PageMarginPicker: React.FC<PageMarginPickerProps> = ({ onClose, pageOrientation, setPageOrientation }) => {
  const {
    margins,
    inputValues,
    handleMarginInputChange,
    handleMarginInputBlur,
    handleMarginKeyDown,
    applyPresetMargins,
    resetMarginsToDefault,
    applyMargins: applyMarginsFromHook,
  } = usePageMethods();

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
                onChange={(e) => handleMarginInputChange('left', e.target.value)}
                onKeyDown={(e) => handleMarginKeyDown(e, 'left')}
                onBlur={() => handleMarginInputBlur('left')}
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
                  onChange={(e) => handleMarginInputChange('top', e.target.value)}
                  onKeyDown={(e) => handleMarginKeyDown(e, 'top')}
                  onBlur={() => handleMarginInputBlur('top')}
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
                  onChange={(e) => handleMarginInputChange('bottom', e.target.value)}
                  onKeyDown={(e) => handleMarginKeyDown(e, 'bottom')}
                  onBlur={() => handleMarginInputBlur('bottom')}
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
                onChange={(e) => handleMarginInputChange('right', e.target.value)}
                onKeyDown={(e) => handleMarginKeyDown(e, 'right')}
                onBlur={() => handleMarginInputBlur('right')}
                className='w-12 text-xs p-1 border border-gray-300 rounded'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-between'>
        <button className='text-sm text-blue-600 hover:underline' onClick={() => resetMarginsToDefault(setPageOrientation)}>
          Reset to Default
        </button>
        <div className='flex gap-2'>
          <button className='px-4 py-1 bg-gray-100 text-gray-700 rounded text-sm' onClick={onClose}>
            Cancel
          </button>
          <button className='px-4 py-1 bg-blue-600 text-white rounded text-sm' onClick={() => applyMarginsFromHook(onClose)}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
