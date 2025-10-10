import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// Plugin to inject CSS import into the built JS
function injectCssImport() {
  return {
    name: 'inject-css-import',
    generateBundle(_options: any, bundle: any) {
      // Find the main JS file
      const jsFile = Object.keys(bundle).find(
        (fileName) => fileName.endsWith('.es.js') || fileName.endsWith('.umd.js')
      );
      
      if (jsFile && bundle[jsFile].type === 'chunk') {
        const cssFileName = 'lax-wp-editor.css';
        // Inject CSS import at the top of the file
        bundle[jsFile].code = `import './${cssFileName}';\n${bundle[jsFile].code}`;
      }
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    injectCssImport(),
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: "./src/index.ts",
      name: "LaxEditor",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
        "react", 
        "react-dom", 
        "framer-motion",
        "@tiptap/react",
        "@tiptap/starter-kit",
        "@tiptap/extension-blockquote",
        "@tiptap/extension-character-count",
        "@tiptap/extension-document",
        "@tiptap/extension-heading",
        "@tiptap/extension-highlight",
        "@tiptap/extension-list",
        "@tiptap/extension-subscript",
        "@tiptap/extension-superscript",
        "@tiptap/extension-table",
        "@tiptap/extension-task-item",
        "@tiptap/extension-task-list",
        "@tiptap/extension-text-align",
        "@tiptap/extension-text-style",
        "@tiptap/extension-typography",
        "@tiptap/extensions",
        "@tiptap/pm",
        // Externalize all ProseMirror packages to prevent bundling
        /^prosemirror-/,
        "antd",
        "@mui/material",
        "@mui/icons-material",
        "classnames",
        "react-select"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "FramerMotion",
        },
      },
    },
    cssCodeSplit: false,
  },
});
