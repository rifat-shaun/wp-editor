import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

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
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: ".storybook",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
