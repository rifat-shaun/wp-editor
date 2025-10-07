import React from 'react';
import type { PageOrientation } from './PageSizeSelector';

interface PageOrientationSelectorProps {
  selectedOrientation: PageOrientation;
  onOrientationChange: (orientation: PageOrientation) => void;
}

const orientations = [
  { value: 'portrait' as PageOrientation, label: 'Portrait', icon: '📄' },
  { value: 'landscape' as PageOrientation, label: 'Landscape', icon: '📋' },
];

const PageOrientationSelector: React.FC<PageOrientationSelectorProps> = ({ 
  selectedOrientation, 
  onOrientationChange 
}) => {
  return (
    <>
      <h3 className="text-sm font-medium text-neutral-700 mb-4">Page Orientation</h3>
      <div className="flex gap-2">
        {orientations.map((orientation) => (
          <label
            key={orientation.value}
            className={`flex items-center justify-center p-3 rounded border cursor-pointer transition-colors flex-1 ${
              selectedOrientation === orientation.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <input
              type="radio"
              name="orientation"
              value={orientation.value}
              checked={selectedOrientation === orientation.value}
              onChange={() => onOrientationChange(orientation.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-lg mb-1">{orientation.icon}</div>
              <div className="text-xs font-medium text-neutral-900">{orientation.label}</div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default PageOrientationSelector;

