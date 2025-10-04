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
import { Editor, ToolbarProvider } from 'lax-wp-editor';
import 'lax-wp-editor/styles';

function App() {
  return (
    <ToolbarProvider>
      <Editor />
    </ToolbarProvider>
  );
}

export default App;
```

### Important: Vite Configuration

If you're using Vite and encounter the `localsInner` error, add this to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Force single instance of ProseMirror to prevent errors
      'prosemirror-view': path.resolve(__dirname, 'node_modules/prosemirror-view'),
      'prosemirror-state': path.resolve(__dirname, 'node_modules/prosemirror-state'),
      'prosemirror-model': path.resolve(__dirname, 'node_modules/prosemirror-model'),
      'prosemirror-transform': path.resolve(__dirname, 'node_modules/prosemirror-transform'),
    },
  },
  // ... rest of your config
});
```

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