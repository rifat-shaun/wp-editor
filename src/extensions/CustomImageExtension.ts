import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ALIGNMENT_OPTIONS, type AlignType } from "@/constants";
import { IMAGE_DEFAULT_WIDTH } from "@/constants/Image";
import { ImageNode } from "@/components/node/ImageNode";

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
  align?: AlignType;
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
        default: ALIGNMENT_OPTIONS.LEFT,
        parseHTML: (element) => {
          return element.getAttribute("data-align") || ALIGNMENT_OPTIONS.LEFT;
        },
        renderHTML: (attributes) => {
          return { "data-align": attributes.align };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
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
                width: options.width || IMAGE_DEFAULT_WIDTH,
                align: options.align || ALIGNMENT_OPTIONS.LEFT,
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
              : IMAGE_DEFAULT_WIDTH,
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
        width: width || IMAGE_DEFAULT_WIDTH,
        "data-align": align || ALIGNMENT_OPTIONS.LEFT,
        style: `width: ${width || IMAGE_DEFAULT_WIDTH}px;`,
      },
    ];
  },
});

export default CustomImageExtension;

