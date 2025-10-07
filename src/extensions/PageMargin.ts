import { Extension } from '@tiptap/core';

export interface MarginValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PageMarginOptions {
  defaultMargins: MarginValues;
  unit: 'in' | 'mm' | 'cm' | 'px';
  presetMargins?: Record<string, MarginValues>;
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

// Unit conversion factors (relative to inches)
export const UNIT_CONVERSION = {
  in: 1,
  cm: 2.54,
  mm: 25.4,
  px: 96, // Approx. 96px per inch (standard CSS assumption)
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageMargin: {
      /**
       * Set the margins of the page
       */
      setPageMargins: (margins: MarginValues) => ReturnType;
      /**
       * Set a preset margin configuration
       */
      setPresetMargins: (presetName: string) => ReturnType;
      /**
       * Reset margins to default values
       */
      resetPageMargins: () => ReturnType;
      /**
       * Update a single margin value
       */
      updateMargin: (side: keyof MarginValues, value: number) => ReturnType;
      /**
       * Change the unit used for margins
       */
      setMarginUnit: (unit: 'in' | 'mm' | 'cm' | 'px') => ReturnType;
    };
  }
}

// Function to apply margins to the editor
const applyMargins = (margins: MarginValues, unit: string = 'in') => {
  // Check if we're running in a browser environment
  if (typeof document === 'undefined') {
    return;
  }

  // Target the editor's content area
  const editorContents = document.querySelectorAll('.ProseMirror');

  // Apply to all matching elements (usually just one)
  editorContents.forEach((editorContent) => {
    if (editorContent instanceof HTMLElement) {
      // Apply margins
      editorContent.style.setProperty('padding-top', `${margins.top}${unit}`, 'important');
      editorContent.style.setProperty('padding-right', `${margins.right}${unit}`, 'important');
      editorContent.style.setProperty('padding-bottom', `${margins.bottom}${unit}`, 'important');
      editorContent.style.setProperty('padding-left', `${margins.left}${unit}`, 'important');
    }
  });

  // Also set data attributes on the body for other components to read
  document.body.setAttribute('data-page-margins', JSON.stringify(margins));
  document.body.setAttribute('data-page-margin-unit', unit);
};

// Convert margins from one unit to another
const convertMargins = (margins: MarginValues, fromUnit: string, toUnit: string): MarginValues => {
  if (fromUnit === toUnit) return margins;

  const fromFactor = UNIT_CONVERSION[fromUnit as keyof typeof UNIT_CONVERSION] || 1;
  const toFactor = UNIT_CONVERSION[toUnit as keyof typeof UNIT_CONVERSION] || 1;
  const conversionRate = fromFactor / toFactor;

  return {
    top: Number((margins.top * conversionRate).toFixed(2)),
    right: Number((margins.right * conversionRate).toFixed(2)),
    bottom: Number((margins.bottom * conversionRate).toFixed(2)),
    left: Number((margins.left * conversionRate).toFixed(2)),
  };
};

export const PageMargin = Extension.create<PageMarginOptions>({
  name: 'pageMargin',

  addOptions() {
    return {
      defaultMargins: DEFAULT_MARGINS,
      unit: 'in',
      presetMargins: PRESET_MARGINS,
    };
  },

  addStorage() {
    return {
      margins: this.options.defaultMargins,
      unit: this.options.unit,
    };
  },

  onCreate() {
    // Apply the initial margins
    applyMargins(this.storage.margins, this.storage.unit);
  },

  onUpdate() {
    // Re-apply the margins on update
    applyMargins(this.storage.margins, this.storage.unit);
  },

  addCommands() {
    return {
      setPageMargins: (margins) => () => {
        // Validate the margins (ensure they are not negative or too large)
        const MAX_MARGIN = this.storage.unit === 'in' ? 5 : this.storage.unit === 'cm' ? 12.7 : this.storage.unit === 'mm' ? 127 : 480; // 5 inches in various units

        const validatedMargins: MarginValues = {
          top: Math.min(Math.max(0, margins.top), MAX_MARGIN),
          right: Math.min(Math.max(0, margins.right), MAX_MARGIN),
          bottom: Math.min(Math.max(0, margins.bottom), MAX_MARGIN),
          left: Math.min(Math.max(0, margins.left), MAX_MARGIN),
        };

        // Store the new margins in extension storage
        this.storage.margins = validatedMargins;

        // Apply the margins to the editor
        applyMargins(validatedMargins, this.storage.unit);

        return true;
      },
      setPresetMargins: (presetName) => () => {
        // Find the preset margins or use default if not found
        const presetMargins = this.options.presetMargins?.[presetName] || this.options.defaultMargins;

        // The preset margins are defined in inches, so convert if necessary
        const convertedMargins = this.storage.unit !== 'in' ? convertMargins(presetMargins, 'in', this.storage.unit) : presetMargins;

        // Store the preset margins
        this.storage.margins = convertedMargins;

        // Apply the margins to the editor
        applyMargins(convertedMargins, this.storage.unit);

        return true;
      },
      resetPageMargins: () => () => {
        // Reset to default margins (convert from inches if needed)
        const defaultMargins =
          this.storage.unit !== 'in' ? convertMargins(this.options.defaultMargins, 'in', this.storage.unit) : this.options.defaultMargins;

        // Store the default margins
        this.storage.margins = defaultMargins;

        // Apply the default margins
        applyMargins(defaultMargins, this.storage.unit);

        return true;
      },
      updateMargin: (side, value) => () => {
        // Validate the value based on the current unit
        const MAX_MARGIN = this.storage.unit === 'in' ? 5 : this.storage.unit === 'cm' ? 12.7 : this.storage.unit === 'mm' ? 127 : 480;

        const validValue = Math.min(Math.max(0, value), MAX_MARGIN);

        // Update just the specified margin
        const updatedMargins = {
          ...this.storage.margins,
          [side]: validValue,
        };

        // Store the updated margins
        this.storage.margins = updatedMargins;

        // Apply the updated margins
        applyMargins(updatedMargins, this.storage.unit);

        return true;
      },
      setMarginUnit: (unit) => () => {
        // Convert the current margins to the new unit
        const convertedMargins = convertMargins(this.storage.margins, this.storage.unit, unit);

        // Update the unit and margins in storage
        this.storage.unit = unit;
        this.storage.margins = convertedMargins;

        // Apply the converted margins with the new unit
        applyMargins(convertedMargins, unit);

        return true;
      },
    };
  },
});

export default PageMargin;
