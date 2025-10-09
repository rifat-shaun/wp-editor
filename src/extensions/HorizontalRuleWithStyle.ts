import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import type { ChainedCommands } from '@tiptap/core'

export const HorizontalRuleWithStyle = HorizontalRule.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      styleType: {
        default: 'single-line',
        parseHTML: element => element.getAttribute('data-style-type'),
        renderHTML: attributes => {
          return {
            'data-style-type': attributes.styleType,
            class: `hr--${attributes.styleType}`,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setHorizontalRule:
        (attributes?: { styleType?: string }) =>
        ({ chain }: { chain: () => ChainedCommands }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: attributes,
            })
            .run()
        },
    }
  },
})

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    horizontalRuleWithStyle: {
      setHorizontalRule: (attributes?: { styleType?: string }) => ReturnType;
    };
  }
}
