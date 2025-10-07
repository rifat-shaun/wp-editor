import React from 'react';

export type PageSize = 'A4' | 'A3' | 'Letter' | 'Legal' | 'Tabloid';
export type PageOrientation = 'portrait' | 'landscape';

export interface PageConfig {
  size: PageSize;
  orientation: PageOrientation;
}

interface PageSizeSelectorProps {
  selectedSize: PageSize;
  onSizeChange: (size: PageSize) => void;
}

const pageSizes = [
  { value: 'A4' as PageSize, label: 'A4', description: '210 × 297 mm' },
  { value: 'A3' as PageSize, label: 'A3', description: '297 × 420 mm' },
  { value: 'Letter' as PageSize, label: 'Letter', description: '8.5 × 11 in' },
  { value: 'Legal' as PageSize, label: 'Legal', description: '8.5 × 14 in' },
  { value: 'Tabloid' as PageSize, label: 'Tabloid', description: '11 × 17 in' },
];

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  return (
    <>
      <h3 className="text-sm font-medium text-neutral-700 mb-4">Page Size</h3>

      <div className="grid grid-cols-2 gap-2">
        {pageSizes.map((size) => (
          <label
            key={size.value}
            className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${
              selectedSize === size.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <input
              type="radio"
              name="pageSize"
              value={size.value}
              checked={selectedSize === size.value}
              onChange={() => onSizeChange(size.value)}
              className="sr-only"
            />
            <div className="flex-1">
              <div className="text-xs font-medium text-neutral-900">{size.label}</div>
              <div className="text-xs text-neutral-500">{size.description}</div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default PageSizeSelector;
