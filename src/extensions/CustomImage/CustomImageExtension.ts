import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageComponent } from "./ImageComponent";

export interface CustomImageExtensionOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, unknown>;
}

export interface CustomImageExtensionAttributes {
  src: string;
  alt?: string;
  title?: string;
  width?: number;
  align?: "left" | "center" | "right";
}

export const CustomImageExtension = Image.extend<CustomImageExtensionOptions>({
  name: "image",

  addOptions() {
    return {
      ...this.parent?.(),
      inline: true,
      allowBase64: true,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      src: {
        default: null,
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => {
          if (!attributes.src) {
            return {};
          }
          return { src: attributes.src };
        },
      },
      alt: {
        default: null,
        parseHTML: (element) => element.getAttribute("alt"),
        renderHTML: (attributes) => {
          if (!attributes.alt) {
            return {};
          }
          return { alt: attributes.alt };
        },
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute("title"),
        renderHTML: (attributes) => {
          if (!attributes.title) {
            return {};
          }
          return { title: attributes.title };
        },
      },
      width: {
        default: 300,
        parseHTML: (element) => {
          const width = element.getAttribute("width");
          return width ? parseInt(width, 10) : 300;
        },
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return { width: attributes.width };
        },
      },
      align: {
        default: "left",
        parseHTML: (element) => {
          return element.getAttribute("data-align") || "left";
        },
        renderHTML: (attributes) => {
          return { "data-align": attributes.align };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },

  addCommands() {
    return {
      setImage:
        (options: CustomImageExtensionAttributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              alt: options.alt || null,
              title: options.title || null,
              width: options.width || 300,
              align: options.align || "left",
            },
          });
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (node) => {
          if (typeof node === "string") return {};
          const element = node as HTMLElement;
          
          return {
            src: element.getAttribute("src"),
            alt: element.getAttribute("alt"),
            title: element.getAttribute("title"),
            width: element.getAttribute("width")
              ? parseInt(element.getAttribute("width")!, 10)
              : 300,
            align: element.getAttribute("data-align") || "left",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { width, align, ...otherAttrs } = HTMLAttributes;
    
    return [
      "img",
      {
        ...this.options.HTMLAttributes,
        ...otherAttrs,
        width: width || 300,
        "data-align": align || "left",
        style: `width: ${width || 300}px;`,
      },
    ];
  },
});

export default CustomImageExtension;

