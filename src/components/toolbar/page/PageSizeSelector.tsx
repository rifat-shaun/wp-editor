import React from 'react';

export type PageSize = 'A4' | 'A3' | 'Letter' | 'Legal' | 'Tabloid';
export type PageOrientation = 'portrait' | 'landscape';

export interface PageConfig {
  size: PageSize;
  orientation: PageOrientation;
}

interface PageSizeSelectorProps {
  selectedConfig: PageConfig;
  onConfigChange: (config: PageConfig) => void;
}

const pageSizes = [
  { value: 'A4' as PageSize, label: 'A4', description: '210 × 297 mm' },
  { value: 'A3' as PageSize, label: 'A3', description: '297 × 420 mm' },
  { value: 'Letter' as PageSize, label: 'Letter', description: '8.5 × 11 in' },
  { value: 'Legal' as PageSize, label: 'Legal', description: '8.5 × 14 in' },
  { value: 'Tabloid' as PageSize, label: 'Tabloid', description: '11 × 17 in' },
];

const orientations = [
  { value: 'portrait' as PageOrientation, label: 'Portrait', icon: '📄' },
  { value: 'landscape' as PageOrientation, label: 'Landscape', icon: '📋' },
];

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ selectedConfig, onConfigChange }) => {
  return (
    <>
      <h3 className="text-sm font-medium text-neutral-700 mb-4">Page Configuration</h3>

      {/* Page Size Selection */}
      <div className="mb-4">
        <h4 className="text-xs font-medium text-neutral-600 mb-2">Size</h4>
        <div className="grid grid-cols-2 gap-2">
          {pageSizes.map((size) => (
            <label
              key={size.value}
              className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${selectedConfig.size === size.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                }`}
            >
              <input
                type="radio"
                name="pageSize"
                value={size.value}
                checked={selectedConfig.size === size.value}
                onChange={() => onConfigChange({ ...selectedConfig, size: size.value })}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-neutral-900">{size.label}</div>
                <div className="text-xs text-neutral-500">{size.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Orientation Selection */}
      <div>
        <h4 className="text-xs font-medium text-neutral-600 mb-2">Orientation</h4>
        <div className="flex gap-2">
          {orientations.map((orientation) => (
            <label
              key={orientation.value}
              className={`flex items-center justify-center p-3 rounded border cursor-pointer transition-colors flex-1 ${selectedConfig.orientation === orientation.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                }`}
            >
              <input
                type="radio"
                name="orientation"
                value={orientation.value}
                checked={selectedConfig.orientation === orientation.value}
                onChange={() => onConfigChange({ ...selectedConfig, orientation: orientation.value })}
                className="sr-only"
              />
              <div className="text-center">
                <div className="text-lg mb-1">{orientation.icon}</div>
                <div className="text-xs font-medium text-neutral-900">{orientation.label}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default PageSizeSelector;
