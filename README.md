# Lax WP Editor

A powerful, configurable rich text editor built with TipTap and React, designed for creating paginated documents with support for multiple page sizes.

## Features

- 📝 Rich text editing with TipTap
- 📄 Multiple page sizes (A4, A3, Letter, Legal, Tabloid)
- 🔄 Portrait and landscape orientations
- 🎨 Bubble menu for text formatting
- ⚙️ Fully configurable features
- 📦 Easy to integrate as an npm package

## Installation

```bash
npm install lax-wp-editor
# or
yarn add lax-wp-editor
```

## Basic Usage

```tsx
import { Editor } from 'lax-wp-editor';

function App() {
  return <Editor />;
}
```

## Configuration

The Editor component accepts a `config` prop to customize its features:

```tsx
import { Editor, EditorConfig } from 'lax-wp-editor';

const editorConfig: EditorConfig = {
  showBubbleMenu: true,        // Show formatting menu on text selection
  showFloatingMenu: true,      // Show menu on empty lines
  showPageSizeSelector: true,  // Show page size selector
  enablePagination: true,      // Enable page-based layout
  initialContent: '<p>Start typing...</p>',
};

function App() {
  return <Editor config={editorConfig} />;
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showBubbleMenu` | `boolean` | `true` | Enable/disable the bubble menu that appears on text selection |
| `showFloatingMenu` | `boolean` | `true` | Enable/disable the floating menu that appears on empty lines |
| `showPageSizeSelector` | `boolean` | `true` | Enable/disable the page size selector |
| `initialContent` | `string` | `"<p>Hello World!</p>"` | Initial HTML content for the editor |
| `enablePagination` | `boolean` | `true` | Enable/disable pagination with page sizing |

## Examples

### Minimal Editor (No menus or pagination)

```tsx
<Editor 
  config={{
    showBubbleMenu: false,
    showFloatingMenu: false,
    showPageSizeSelector: false,
    enablePagination: false,
  }}
/>
```

### Editor with only Bubble Menu

```tsx
<Editor 
  config={{
    showBubbleMenu: true,
    showFloatingMenu: false,
    showPageSizeSelector: false,
  }}
/>
```

### Custom Initial Content

```tsx
<Editor 
  config={{
    initialContent: '<h1>My Document</h1><p>Start writing here...</p>',
  }}
/>
```

## Supported Page Sizes

- **A4**: 210mm × 297mm (Portrait) / 297mm × 210mm (Landscape)
- **A3**: 297mm × 420mm (Portrait) / 420mm × 297mm (Landscape)
- **Letter**: 8.5in × 11in (Portrait) / 11in × 8.5in (Landscape)
- **Legal**: 8.5in × 14in (Portrait) / 14in × 8.5in (Landscape)
- **Tabloid**: 11in × 17in (Portrait) / 17in × 11in (Landscape)

## SVG Icons

The editor uses `vite-plugin-svg-icons` for efficient SVG icon management. All icons are compiled into a single sprite.

### Using Icons

```tsx
import { SvgIcon } from 'lax-wp-editor';

<SvgIcon name="bold" size={18} />
<SvgIcon name="italic" color="#333" />
```

### Adding Custom Icons

1. Place SVG files in `src/assets/icons/`
2. Icons are automatically registered on build
3. Use with `SvgIcon` component using the filename as the name

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## License

MIT
