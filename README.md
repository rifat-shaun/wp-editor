# Lax WP Editor

A modern, feature-rich WordPress-style editor built with React and TipTap. This editor provides a clean, intuitive interface for rich text editing with customizable toolbars and extensive formatting options.

## Features

- 🎨 **Modern UI**: Clean, responsive design with customizable themes
- 📝 **Rich Text Editing**: Full-featured WYSIWYG editor with TipTap
- 🛠️ **Flexible Toolbars**: Professional and Classic toolbar modes
- 📄 **Page Management**: Multiple page sizes and orientations
- 🎯 **Customizable**: Easy to integrate and customize
- 📱 **Responsive**: Works seamlessly on desktop and mobile
- 🔧 **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install lax-wp-editor
# or
yarn add lax-wp-editor
# or
pnpm add lax-wp-editor
```

## Quick Start

```tsx
import React from 'react';
import { Editor } from 'lax-wp-editor';
import 'lax-wp-editor/styles'; // ⚠️ Important: Don't forget to import the styles!

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Editor />
    </div>
  );
}

export default App;
```

> **⚠️ Important:** You must import the CSS styles for the editor to display correctly.
> 
> **Two ways to import styles:**
> ```tsx
> // Option 1: Using the styles export (recommended)
> import 'lax-wp-editor/styles';
> 
> // Option 2: Direct CSS import
> import 'lax-wp-editor/dist/lax-wp-editor.css';
> ```

### Important: Fixing ProseMirror Duplication Error

If you encounter the `localsInner` error, it's caused by multiple versions of ProseMirror packages in **your application's** dependency tree.

**Official Tiptap Solution:**

This package already uses `@tiptap/pm` for all ProseMirror functionality (as recommended by Tiptap). However, you need to ensure your application also deduplicates ProseMirror versions.

**1. In your application directory, check for duplicate ProseMirror versions:**
```bash
npm ls prosemirror-view
# or
yarn list prosemirror-view
```

**2. If you see multiple versions, add this to YOUR APPLICATION's `package.json`:**

**For Yarn users:**
```json
{
  "resolutions": {
    "prosemirror-view": "^1.41.0",
    "prosemirror-state": "^1.4.3",
    "prosemirror-model": "^1.25.0",
    "prosemirror-transform": "^1.10.0"
  }
}
```

**For npm users (v8.3.0+):**
```json
{
  "overrides": {
    "prosemirror-view": "^1.41.0",
    "prosemirror-state": "^1.4.3",
    "prosemirror-model": "^1.25.0",
    "prosemirror-transform": "^1.10.0"
  }
}
```

**For pnpm users:**
```json
{
  "pnpm": {
    "overrides": {
      "prosemirror-view": "^1.41.0",
      "prosemirror-state": "^1.4.3",
      "prosemirror-model": "^1.25.0",
      "prosemirror-transform": "^1.10.0"
    }
  }
}
```

**3. Clean install in YOUR APPLICATION:**
```bash
# In your application directory (not lax-wp-editor)
rm -rf node_modules package-lock.json  # or yarn.lock / pnpm-lock.yaml
npm install  # or yarn / pnpm install
```

**4. Verify all packages are deduped:**
```bash
npm ls prosemirror-view
# All instances should show "deduped" and point to the same version
```

> **Note:** This package uses `@tiptap/pm` internally (not direct ProseMirror imports) to prevent version conflicts. The deduplication step is only needed if other packages in your project import ProseMirror directly.

## Basic Usage

### Simple Editor

```tsx
import { Editor, ToolbarProvider } from 'lax-wp-editor';
import 'lax-wp-editor/styles';

function MyEditor() {
  return (
    <ToolbarProvider>
      <Editor />
    </ToolbarProvider>
  );
}
```

### Custom Configuration

```tsx
import { Editor, ToolbarProvider, defaultEditorConfig } from 'lax-wp-editor';
import 'lax-wp-editor/styles';

function MyEditor() {
  const config = {
    ...defaultEditorConfig,
    // Add your custom configuration
  };

  return (
    <ToolbarProvider>
      <Editor config={config} />
    </ToolbarProvider>
  );
}
```

### Different Toolbar Types

```tsx
import { Editor, ToolbarProvider, TOOLBAR_TYPES_ENUM } from 'lax-wp-editor';
import 'lax-wp-editor/styles';

function MyEditor() {
  return (
    <ToolbarProvider initialToolbar={TOOLBAR_TYPES_ENUM.CLASSIC}>
      <Editor />
    </ToolbarProvider>
  );
}
```

## Components

### Main Components

- **`Editor`**: The main editor component
- **`ToolbarProvider`**: Context provider for toolbar state
- **`Toolbar`**: Main toolbar component
- **`ProfessionalToolbar`**: Professional-style toolbar
- **`ClassicToolbar`**: Classic-style toolbar

### Individual Toolbar Components

- **`HeadingOptions`**: Heading selection dropdown
- **`HomeOptions`**: Basic formatting options
- **`FontStyleOptions`**: Font styling options
- **`ParagraphStyleOption`**: Paragraph styling

### Utility Components

- **`SvgIcon`**: SVG icon component
- **`PageSizeSelector`**: Page size and orientation selector

## Hooks

- **`useTiptapEditorState`**: Access editor state
- **`useHeadingStyleMethods`**: Heading manipulation methods
- **`useFontStyleMethods`**: Font styling methods
- **`useHomeOptionMethods`**: Basic formatting methods
- **`useParagraphStyleMethods`**: Paragraph styling methods
- **`usePageSize`**: Page size management

## Configuration

### Editor Configuration

```tsx
import { EditorConfig } from 'lax-wp-editor';

const config: EditorConfig = {
  // Your configuration options
};
```

### Toolbar Types

```tsx
import { TOOLBAR_TYPES_ENUM } from 'lax-wp-editor';

// Available toolbar types:
TOOLBAR_TYPES_ENUM.PROFESSIONAL  // Professional toolbar
TOOLBAR_TYPES_ENUM.CLASSIC       // Classic toolbar
```

## Styling

The package includes default styles that you can import:

```tsx
import 'lax-wp-editor/styles';
```

You can also customize the styles by overriding CSS variables or using your own CSS.

## TypeScript Support

The package includes full TypeScript definitions:

```tsx
import { Editor, EditorConfig, PageSize } from 'lax-wp-editor';
```

## API Reference

### Editor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `EditorConfig` | `defaultEditorConfig` | Editor configuration |
| `onUpdate` | `(content: string) => void` | - | Callback when content changes |
| `initialContent` | `string` | - | Initial editor content |

### ToolbarProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialToolbar` | `ToolbarType` | `PROFESSIONAL` | Initial toolbar type |
| `children` | `ReactNode` | - | Child components |

## Examples

### Custom Toolbar

```tsx
import { Editor, Toolbar, HeadingOptions, HomeOptions } from 'lax-wp-editor';

function CustomEditor() {
  return (
    <div>
      <Toolbar>
        <HeadingOptions />
        <HomeOptions />
      </Toolbar>
      <Editor />
    </div>
  );
}
```

### Page Size Management

```tsx
import { Editor, PageSizeSelector, usePageSize } from 'lax-wp-editor';

function EditorWithPageSize() {
  const { pageSize, setPageSize } = usePageSize();
  
  return (
    <div>
      <PageSizeSelector />
      <Editor />
    </div>
  );
}
```

## Development

### Building the Package

```bash
npm run build
```

### Running Storybook

```bash
npm run storybook
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Support

If you have any questions or need help, please open an issue on GitHub.