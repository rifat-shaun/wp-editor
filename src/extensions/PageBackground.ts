import { Extension } from '@tiptap/core';

export interface PageBackgroundOptions {
  defaultColor: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBackground: {
      /**
       * Set the background color of the page
       */
      setPageBackgroundColor: (color: string) => ReturnType;
      /**
       * Remove the background color from the page
       */
      unsetPageBackgroundColor: () => ReturnType;
    };
  }
}

// Helper method to determine if a color is dark
const isColorDark = (hexColor: string): boolean => {
  // Default to false for invalid or empty colors
  if (!hexColor || hexColor === 'transparent') return false;

  // Convert hex to RGB
  let r = 0,
    g = 0,
    b = 0;

  // Handle different hex formats
  if (hexColor.startsWith('#')) {
    if (hexColor.length === 4) {
      // For #RGB format
      r = parseInt(hexColor[1] + hexColor[1], 16);
      g = parseInt(hexColor[2] + hexColor[2], 16);
      b = parseInt(hexColor[3] + hexColor[3], 16);
    } else if (hexColor.length === 7) {
      // For #RRGGBB format
      r = parseInt(hexColor.substring(1, 3), 16);
      g = parseInt(hexColor.substring(3, 5), 16);
      b = parseInt(hexColor.substring(5, 7), 16);
    }
  } else if (hexColor.startsWith('rgb')) {
    // For rgb() or rgba() format
    const parts = hexColor.match(/\d+/g);
    if (parts && parts.length >= 3) {
      r = parseInt(parts[0], 10);
      g = parseInt(parts[1], 10);
      b = parseInt(parts[2], 10);
    }
  }

  // Calculate perceived brightness using the formula from WCAG
  // See: https://www.w3.org/TR/AERT/#color-contrast
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return true if the color is dark (brightness < 128)
  return brightness < 128;
};

// Function to apply background color to the editor
const applyBackgroundColor = (color: string) => {
  // Check if we're running in a browser environment
  if (typeof document === 'undefined') {
    return;
  }

  // Target the editor's content area - query for all ProseMirror instances
  const editorContents = document.querySelectorAll('.editor-container .editor-content');

  // Apply to all matching elements (usually just one)
  editorContents.forEach((editorContent) => {
    if (editorContent instanceof HTMLElement) {
      // Use !important to override any default styles
      editorContent.style.setProperty('background-color', color, 'important');

      // Adjust text color for dark backgrounds
      if (isColorDark(color)) {
        editorContent.style.setProperty('color', '#ffffff', 'important');
      } else {
        editorContent.style.setProperty('color', '#000000', 'important');
      }
    }
  });
};

export const PageBackground = Extension.create<PageBackgroundOptions>({
  name: 'pageBackground',

  addOptions() {
    return {
      defaultColor: '#ffffff', // Default white background
    };
  },

  addStorage() {
    return {
      backgroundColor: this.options.defaultColor,
    };
  },

  onCreate() {
    // Apply the initial background color
    applyBackgroundColor(this.storage.backgroundColor);
  },

  onUpdate() {
    // Re-apply the background color on update
    applyBackgroundColor(this.storage.backgroundColor);
  },

  addCommands() {
    return {
      setPageBackgroundColor: (color) => () => {
        // Store the new color in extension storage
        this.storage.backgroundColor = color;

        // Apply the background color to the editor
        applyBackgroundColor(color);

        return true;
      },
      unsetPageBackgroundColor: () => () => {
        // Reset to default color
        this.storage.backgroundColor = this.options.defaultColor;

        // Apply the default background color
        applyBackgroundColor(this.options.defaultColor);

        return true;
      },
    };
  },
});

export default PageBackground;
