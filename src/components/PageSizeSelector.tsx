import React from 'react';

export type PageSize = 'A4' | 'A3' | 'Letter' | 'Legal' | 'Tabloid';

interface PageSizeSelectorProps {
  selectedSize: PageSize;
  onSizeChange: (size: PageSize) => void;
}

const pageSizes = [
  { value: 'A4' as PageSize, label: 'A4 (210 × 297 mm)', description: 'Standard international' },
  { value: 'A3' as PageSize, label: 'A3 (297 × 420 mm)', description: 'Large format' },
  { value: 'Letter' as PageSize, label: 'Letter (8.5 × 11 in)', description: 'US standard' },
  { value: 'Legal' as PageSize, label: 'Legal (8.5 × 14 in)', description: 'US legal' },
  { value: 'Tabloid' as PageSize, label: 'Tabloid (11 × 17 in)', description: 'Large format' },
];

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-neutral-700 mb-3">Page Size</h3>
      <div className="space-y-2">
        {pageSizes.map((size) => (
          <label
            key={size.value}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
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
              <div className="text-sm font-medium text-neutral-900">{size.label}</div>
              <div className="text-xs text-neutral-500">{size.description}</div>
            </div>
            {selectedSize === size.value && (
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default PageSizeSelector;
