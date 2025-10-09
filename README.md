# Lax WP Editor

A modern, feature-rich WordPress-style editor built with React and TipTap. This editor provides a clean, intuitive interface for rich text editing with customizable toolbars and extensive formatting options.

## Table of Contents

- [Recent Updates](#recent-updates)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Basic Configuration](#basic-configuration)
  - [AI Autocompletion](#ai-autocompletion)
  - [Export Functionality](#export-functionality)
  - [Variable Text Feature](#variable-text-feature)
  - [Configuration Options Reference](#configuration-options-reference)
- [Components](#components)
- [Hooks](#hooks)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Recent Updates

### v2.0.0 - Latest Release

#### ✨ Export Functionality
- Added comprehensive export system with support for multiple formats
- Export your content as Text (.txt), JSON (.json), Markdown (.md), or HTML (.html)
- New **Export** tab in the toolbar for quick access to all export options
- `useExport` hook for programmatic export functionality

#### 📝 Variable Text Feature
- Dynamic variable text support for mail merge and templates
- Insert variables programmatically from your application
- `onEditorReady` callback provides `insertVariable` method
- Variables display actual values or `{{variableName}}` placeholders
- Supports manual typing with `{{variableName}}` syntax

#### 🎨 Toolbar Enhancements
- Improved toolbar dropdown with visual icons for each mode
- Better visual distinction between Professional, Classic, and Hide Toolbar modes
- Enhanced toolbar tab interface with 5 tabs: Home, Insert, Table, Page, and Export
- Smoother transitions between toolbar types

#### 🖼️ Custom Image Support
- Resizable images with drag handles
- Image alignment (left, center, right)
- Bubble menu for image options
- Inline and block image support

## Features

- 🎨 **Modern UI**: Clean, responsive design with customizable themes
- 📝 **Rich Text Editing**: Full-featured WYSIWYG editor with TipTap
- 🛠️ **Flexible Toolbars**: Professional and Classic toolbar modes with tabbed interface
- 📄 **Page Management**: Multiple page sizes and orientations
- 📤 **Export Options**: Export your content as Text, HTML, Markdown, or JSON
- 📝 **Variable Text**: Dynamic variables for mail merge and template systems
- 🖼️ **Image Support**: Resizable images with alignment and custom styling
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
import { Editor } from 'lax-wp-editor'; // CSS is automatically included!

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Editor />
    </div>
  );
}

export default App;
```

> **✨ New in v1.2.0:** CSS is now automatically imported! You no longer need to manually import the styles.
> 
> **For older versions (v1.1.x), you need to manually import styles:**
> ```tsx
> import 'lax-wp-editor/styles';
> // or
> import 'lax-wp-editor/dist/lax-wp-editor.css';
> ```

## Configuration

The editor accepts a `config` prop with the following options:

### Basic Configuration

```tsx
import { Editor, type EditorConfig } from 'lax-wp-editor';

function App() {
  const config: EditorConfig = {
    // Initial content (HTML string)
    content: '<p>Your initial content here</p>',
    
    // Toolbar type: 'professional' or 'classic'
    defaultToolbar: 'professional',
    
    // Enable/disable features
    showBubbleMenu: true,           // Show bubble menu on text selection
    showFloatingMenu: false,        // Show floating menu on empty lines
    showPageSizeSelector: true,     // Show page size selector
    enablePagination: true,         // Enable pagination
    
    // Content change callback with debounce
    debounceTimeForContentChange: 300,  // Debounce time in milliseconds (default: 300ms)
    onContentChange: (editor) => {
      const html = editor.getHTML();
      console.log('Content changed:', html);
    },
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Editor config={config} />
    </div>
  );
}
```

### AI Autocompletion

You can enable AI autocompletion by providing your own completion function:

```tsx
import { Editor, type EditorConfig } from 'lax-wp-editor';

function App() {
  const config: EditorConfig = {
    aiAutocompletion: {
      enabled: true,
      minWordsToTriggerAutoCompletion: 5, // Trigger after 5 words (default: 3)
      debounceTime: 300, // Wait 300ms before calling API (default: 100ms)
      
      // Required: Provide your custom fetch function
      fetchCompletion: async (text: string) => {
        const response = await fetch('https://your-api.com/completions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY',
          },
          body: JSON.stringify({ prompt: text }),
        });
        const data = await response.json();
        return data.completion; // Return the completion text
      },
    },
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Editor config={config} />
    </div>
  );
}
```

> **⚠️ Important:** AI autocompletion requires you to provide a `fetchCompletion` function. The editor does not include a default AI service.

**Keyboard Shortcuts for AI Autocompletion:**
- `Tab` - Accept suggestion
- `Escape` - Dismiss suggestion
- `Ctrl+Shift+Space` (Windows/Linux) or `Cmd+Shift+Space` (Mac) - Toggle autocompletion on/off

### Export Functionality

The editor includes a comprehensive export system that allows users to download their content in multiple formats:

```tsx
import { Editor, useExport } from 'lax-wp-editor';

function MyEditorComponent({ editor }) {
  const { 
    downloadTextFile, 
    downloadJsonFile, 
    downloadMarkdownFile, 
    downloadHtmlFile 
  } = useExport(editor);

  return (
    <div>
      <button onClick={downloadTextFile}>Export as Text</button>
      <button onClick={downloadJsonFile}>Export as JSON</button>
      <button onClick={downloadMarkdownFile}>Export as Markdown</button>
      <button onClick={downloadHtmlFile}>Export as HTML</button>
    </div>
  );
}
```

**Available Export Formats:**

| Format | Description | Method |
|--------|-------------|--------|
| **Text** | Plain text (.txt) | `downloadTextFile()` |
| **JSON** | TipTap JSON format (.json) | `downloadJsonFile()` |
| **Markdown** | Markdown format (.md) | `downloadMarkdownFile()` |
| **HTML** | HTML format (.html) | `downloadHtmlFile()` |

> **💡 Tip:** The Export tab is built into the toolbar and provides quick access to all export formats. You can also use the `useExport` hook to create custom export buttons.

### Variable Text Feature

The editor supports dynamic variable text that can be inserted programmatically from your application. Variables are displayed as placeholders that get replaced with actual values.

**Enable Variable Text:**

```tsx
import { useState } from 'react';
import { Editor } from 'lax-wp-editor';

function App() {
  const [insertVariable, setInsertVariable] = useState<((key: string, value?: string) => void) | null>(null);

  const handleInsertName = () => {
    insertVariable?.('userName');
  };

  const handleInsertEmailWithValue = () => {
    insertVariable?.('email', 'newemail@example.com');
  };

  return (
    <div>
      <button onClick={handleInsertName}>Insert User Name</button>
      <button onClick={handleInsertEmailWithValue}>Insert Email</button>
      
      <Editor 
        config={{
          enableVariableText: true,
          variableValues: {
            userName: 'John Doe',
            email: 'john@example.com',
            company: 'Acme Inc',
          },
          onEditorReady: ({ insertVariable: insert }) => {
            // Store the insertVariable method when editor is ready
            setInsertVariable(() => insert);
          },
        }}
      />
    </div>
  );
}
```

**Variable Text Configuration:**

| Option | Type | Description |
|--------|------|-------------|
| `enableVariableText` | `boolean` | Enable/disable variable text feature |
| `variableValues` | `Record<string, string>` | Key-value pairs for variable replacements |
| `onEditorReady` | `(methods) => void` | Callback that provides editor methods including `insertVariable` |

**Insert Variable Method:**

```tsx
insertVariable(key: string, value?: string)
```

- **`key`**: The variable name/key
- **`value`**: (Optional) Update the variable value before inserting

**How Variables Work:**

1. Variables are inserted as special nodes in the editor
2. They display the value from `variableValues` config
3. If no value exists, they display as `{{variableName}}`
4. Variables can be typed manually using `{{variableName}}` syntax (if enabled)
5. Users can insert variables programmatically from outside the editor

**Example Use Cases:**

- Mail merge functionality
- Template systems
- Dynamic content generation
- Personalized documents

### Configuration Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `content` | `string` | `""` | Initial HTML content for the editor |
| `defaultToolbar` | `'professional' \| 'classic'` | `'professional'` | Toolbar style |
| `showBubbleMenu` | `boolean` | `true` | Show bubble menu on text selection |
| `showFloatingMenu` | `boolean` | `false` | Show floating menu on empty lines |
| `showPageSizeSelector` | `boolean` | `true` | Show page size selector |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `debounceTimeForContentChange` | `number` | `300` | Debounce time (ms) for `onContentChange` callback |
| `onContentChange` | `(editor: Editor) => void` | `undefined` | Callback when content changes (debounced) |
| `enableVariableText` | `boolean` | `false` | Enable variable text feature |
| `variableValues` | `Record<string, string>` | `{}` | Variable name to value mappings |
| `onEditorReady` | `(methods) => void` | `undefined` | Callback with editor methods when ready |
| `onShare` | `() => void` | `undefined` | Callback when share button is clicked |
| `aiAutocompletion` | `AIAutocompletionConfig` | See below | AI autocompletion configuration |

**AIAutocompletionConfig:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Enable/disable AI autocompletion |
| `minWordsToTriggerAutoCompletion` | `number` | `3` | Minimum words to trigger autocompletion |
| `debounceTime` | `number` | `100` | Debounce time (ms) before calling API |
| `fetchCompletion` | `(text: string) => Promise<string>` | `undefined` | **Required** - Custom fetch function for AI completions |

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

The editor supports three toolbar modes:

1. **Professional** - Multi-row toolbar with all options visible
2. **Classic** - Single-row compact toolbar with grouped controls
3. **Hide Toolbar** - No toolbar (presentation mode)

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

Users can switch between toolbar modes using the built-in toolbar dropdown menu, which includes icons for each mode:
- 📊 **Classic** - Compact view
- 🎛️ **Professional** - Full view
- 👁️ **Hide Toolbar** - Hidden view

## Components

### Main Components

- **`Editor`**: The main editor component
- **`ToolbarProvider`**: Context provider for toolbar state
- **`Toolbar`**: Main toolbar component with tabbed interface
- **`ProfessionalToolbar`**: Professional-style toolbar (multi-row layout)
- **`ClassicToolbar`**: Classic-style toolbar (single-row layout)
- **`ToolbarDropdown`**: Dropdown to switch between toolbar modes

### Toolbar Tabs

The editor includes a tabbed toolbar interface with the following tabs:

- **`Home`**: Basic formatting options (bold, italic, underline, alignment, etc.)
- **`Insert`**: Insert elements (tables, images, dividers, etc.)
- **`Table`**: Table-specific operations (add/remove rows/columns, merge cells, etc.)
- **`Page`**: Page settings (size, orientation, margins, background)
- **`Export`**: Export content in multiple formats (Text, JSON, Markdown, HTML)

### Individual Toolbar Components

- **`HeadingOptions`**: Heading selection dropdown
- **`HomeOptions`**: Basic formatting options
- **`FontStyleOptions`**: Font styling options
- **`ParagraphStyleOption`**: Paragraph styling
- **`ExportOptions`**: Export functionality for multiple file formats
- **`TableOptions`**: Table manipulation controls
- **`InsertOptions`**: Insert various elements into the document

### Utility Components

- **`SvgIcon`**: SVG icon component
- **`PageSizeSelector`**: Page size and orientation selector
- **`Button`**: Base button component
- **`ColorPicker`**: Color picker for text and background colors

## Hooks

- **`useTiptapEditorState`**: Access editor state
- **`useHeadingStyleMethods`**: Heading manipulation methods
- **`useFontStyleMethods`**: Font styling methods
- **`useHomeOptionMethods`**: Basic formatting methods
- **`useParagraphStyleMethods`**: Paragraph styling methods
- **`usePageMethods`**: Page size and layout management
- **`useExport`**: Export content in multiple formats (Text, JSON, Markdown, HTML)
- **`useTableMethods`**: Table manipulation methods
- **`useLinks`**: Link management methods
- **`usePresentationMode`**: Presentation mode controls
- **`useZoom`**: Zoom controls for the editor

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
TOOLBAR_TYPES_ENUM.PROFESSIONAL  // Professional toolbar (multi-row, all options visible)
TOOLBAR_TYPES_ENUM.CLASSIC       // Classic toolbar (single-row, compact)
TOOLBAR_TYPES_ENUM.HIDE_TOOLBAR  // Hide toolbar completely
```

The toolbar includes 5 tabs:
- **Home**: Text formatting, alignment, lists, etc.
- **Insert**: Tables, images, dividers, and other insertable elements
- **Table**: Table-specific operations (add/remove rows/columns, merge cells)
- **Page**: Page layout settings (size, orientation, margins, background)
- **Export**: Download content in various formats (Text, JSON, Markdown, HTML)

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

### ToolbarDropdown Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onToolbarChange` | `(toolbarType: string) => void` | - | Callback when toolbar type changes |

### useExport Hook

Returns an object with the following methods:

| Method | Description |
|--------|-------------|
| `downloadTextFile()` | Downloads content as plain text (.txt) |
| `downloadJsonFile()` | Downloads content as TipTap JSON format (.json) |
| `downloadMarkdownFile()` | Downloads content as Markdown (.md) |
| `downloadHtmlFile()` | Downloads content as HTML (.html) |

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
import { Editor, PageSizeSelector, usePageMethods } from 'lax-wp-editor';

function EditorWithPageSize() {
  const { pageSize, setPageSize } = usePageMethods();
  
  return (
    <div>
      <PageSizeSelector />
      <Editor />
    </div>
  );
}
```

### Export Functionality

```tsx
import { Editor, useExport } from 'lax-wp-editor';

function EditorWithExport() {
  const editorRef = useRef(null);
  const { 
    downloadTextFile, 
    downloadJsonFile, 
    downloadMarkdownFile, 
    downloadHtmlFile 
  } = useExport(editorRef.current);
  
  return (
    <div>
      <div className="export-buttons">
        <button onClick={downloadTextFile}>Download as Text</button>
        <button onClick={downloadJsonFile}>Download as JSON</button>
        <button onClick={downloadMarkdownFile}>Download as Markdown</button>
        <button onClick={downloadHtmlFile}>Download as HTML</button>
      </div>
      <Editor ref={editorRef} />
    </div>
  );
}
```

### Switching Toolbar Modes

```tsx
import { Editor, ToolbarProvider, ToolbarDropdown } from 'lax-wp-editor';

function EditorWithToolbarSwitch() {
  return (
    <ToolbarProvider>
      <ToolbarDropdown onToolbarChange={(type) => console.log('Toolbar changed to:', type)} />
      <Editor />
    </ToolbarProvider>
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

## Keywords

`wysiwyg`, `editor`, `react`, `tiptap`, `wordpress`, `rich-text`, `text-editor`, `markdown`, `html-editor`, `document-editor`, `export`, `typescript`

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Test your changes thoroughly

## License

MIT © Rifat Hasan Shaun

## Author

**Rifat Hasan Shaun**
- Email: mdrifathasanshaun@gmail.com
- GitHub: [@rifat-shaun](https://github.com/rifat-shaun)

## Support

If you have any questions or need help, please:
- Open an issue on [GitHub](https://github.com/rifat-shaun/wp-editor/issues)
- Check the [documentation](https://github.com/rifat-shaun/wp-editor#readme)
- Review the examples in this README
