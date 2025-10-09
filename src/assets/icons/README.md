# SVG Icons

This directory contains SVG icons used throughout the application.

## How to Add New Icons

1. Place your SVG file in this directory (e.g., `myicon.svg`)
2. The icon will automatically be registered with the name format: `icon-myicon`
3. Use it in your components with the `SvgIcon` component

## Usage

```tsx
import SvgIcon from '../components/common/SvgIcon';

// Basic usage
<SvgIcon name="bold" />

// With custom size
<SvgIcon name="italic" size={24} />

// With custom color
<SvgIcon name="clear" color="#ff0000" />

// With className
<SvgIcon name="strikethrough" className="custom-class" />
```

## Available Icons

- `bold` - Bold text formatting
- `italic` - Italic text formatting
- `strikethrough` - Strikethrough text formatting
- `clear` - Clear formatting

## Icon Format

SVG icons should:
- Use `currentColor` for stroke/fill to support dynamic coloring
- Have a viewBox attribute (typically `viewBox="0 0 24 24"`)
- Be optimized and cleaned (remove unnecessary metadata)
- Use consistent sizing (24x24 is recommended)

## Example SVG Structure

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="..."/>
</svg>
```

