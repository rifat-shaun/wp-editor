import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface AIAutocompletionOptions {
  minWordsToTriggerAutoCompletion: number;
  debounceTime: number;
  isEnabled: boolean;
  /** Custom fetch function - required for AI autocompletion to work */
  fetchCompletion?: (text: string) => Promise<string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiAutocompletion: {
      acceptSuggestion: () => ReturnType;
      dismissSuggestion: () => ReturnType;
      enableAutocompletion: () => ReturnType;
      disableAutocompletion: () => ReturnType;
      toggleAutocompletion: () => ReturnType;
    };
  }
}

declare module "@tiptap/core" {
  interface Storage {
    aiAutoCompletion: AIAutocompletionOptions;
  }
}

interface SuggestionData {
  from: number;
  to: number;
  text: string;
}

interface PluginState {
  decorationSet: DecorationSet;
  suggestion: SuggestionData | null;
}

export const aiAutocompletionKey = new PluginKey<PluginState>("ai-autocompletion");

export const AIAutocompletion = Extension.create<AIAutocompletionOptions>({
  name: "aiAutoCompletion",

  priority: 1000, // High priority to handle Tab before other extensions

  addOptions() {
    return {
      minWordsToTriggerAutoCompletion: 3,
      debounceTime: 100,
      isEnabled: false,
      fetchCompletion: undefined,
    };
  },

  addStorage() {
    return {
      isEnabled: this.options.isEnabled,
    };
  },

  addCommands() {
    return {
      acceptSuggestion:
        () =>
          ({ state, dispatch }) => {
            const pluginState = aiAutocompletionKey.getState(state);
            if (!pluginState?.suggestion) return false;

            if (dispatch) {
              const { to, text } = pluginState.suggestion;
              const tr = state.tr
                .insertText(text, to, to)
                .setMeta(aiAutocompletionKey, { type: "clear" });
              dispatch(tr);
            }

            return true;
          },

      dismissSuggestion:
        () =>
          ({ state, dispatch }) => {
            if (dispatch) {
              const tr = state.tr.setMeta(aiAutocompletionKey, { type: "clear" });
              dispatch(tr);
            }
            return true;
          },

      enableAutocompletion:
        () =>
          ({ editor }) => {
            this.options.isEnabled = true;
            this.storage.isEnabled = true;
            editor.commands.dismissSuggestion();
            return true;
          },

      disableAutocompletion:
        () =>
          ({ editor }) => {
            this.options.isEnabled = false;
            this.storage.isEnabled = false;
            editor.commands.dismissSuggestion();
            return true;
          },

      toggleAutocompletion:
        () =>
          ({ editor }) => {
            return this.storage.isEnabled
              ? editor.commands.disableAutocompletion()
              : editor.commands.enableAutocompletion();
          },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        // Check if there's a suggestion
        const pluginState = aiAutocompletionKey.getState(editor.state);
        if (pluginState?.suggestion) {
          const result = editor.commands.acceptSuggestion();
          return result;
        }
        // If no suggestion, let other extensions handle Tab (e.g., indent)
        return false;
      },
      Escape: ({ editor }) => {
        // Check if there's a suggestion
        const pluginState = aiAutocompletionKey.getState(editor.state);
        if (pluginState?.suggestion) {
          return editor.commands.dismissSuggestion();
        }
        // If no suggestion, let other extensions handle Escape
        return false;
      },
      "Mod-Shift-Space": ({ editor }) => {
        return editor.commands.toggleAutocompletion();
      },
    };
  },

  addProseMirrorPlugins() {
    const self = this;
    let debounceTimeout: ReturnType<typeof setTimeout>;
    let currentAbortController: AbortController | null = null;

    return [
      new Plugin<PluginState>({
        key: aiAutocompletionKey,

        state: {
          init(): PluginState {
            return { decorationSet: DecorationSet.empty, suggestion: null };
          },

          apply(tr, pluginState): PluginState {
            const meta = tr.getMeta(aiAutocompletionKey);

            if (meta?.type === "clear") {
              return { decorationSet: DecorationSet.empty, suggestion: null };
            }

            if (meta?.type === "setSuggestion") {
              const { to, text } = meta.suggestion;
              const decoration = Decoration.widget(to, () => {
                const span = document.createElement("span");
                span.className = "ai-suggestion";
                span.textContent = text;
                span.style.opacity = "0.6";
                span.style.backgroundColor = "#f8f9fa";
                return span;
              });

              return {
                decorationSet: DecorationSet.create(tr.doc, [decoration]),
                suggestion: meta.suggestion,
              };
            }

            const decorationSet = pluginState.decorationSet.map(
              tr.mapping,
              tr.doc
            );

            return {
              decorationSet: tr.docChanged
                ? DecorationSet.empty
                : decorationSet,
              suggestion: tr.docChanged ? null : pluginState.suggestion,
            };
          },
        },

        props: {
          decorations(state) {
            return this.getState(state)?.decorationSet;
          },
        },

        view(view) {
          const fetchSuggestion = async (text: string, position: number) => {
            if (!self.storage.isEnabled) return;

            currentAbortController?.abort();
            currentAbortController = new AbortController();

            try {
              // Only proceed if custom fetch function is provided
              if (!self.options.fetchCompletion) {
                return;
              }

              const completion = await self.options.fetchCompletion(text);

              // Validate completion is a non-empty string
              if (
                completion &&
                typeof completion === "string"
              ) {
                view.dispatch(
                  view.state.tr.setMeta(aiAutocompletionKey, {
                    type: "setSuggestion",
                    suggestion: {
                      from: position - text.length,
                      to: position,
                      text: completion,
                    },
                  })
                );
              }
            } catch (error) {
              if (error instanceof Error && error.name !== "AbortError") {
                console.error("[AI Autocompletion Error]:", error);
              }
            } finally {
              if (
                currentAbortController?.signal === currentAbortController.signal
              )
                currentAbortController = null;
            }
          };

          return {
            update(updatedView, prevState) {
              if (
                !self.storage.isEnabled ||
                prevState.doc.eq(updatedView.state.doc)
              )
                return;

              const { selection } = updatedView.state;
              if (!selection.empty) return;

              const cursorPos = selection.$head.pos;
              const textBefore = updatedView.state.doc.textBetween(
                Math.max(0, cursorPos - 200),
                cursorPos,
                "\n"
              );
              const wordCount = textBefore
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;

              // Clear any existing suggestions and abort if below threshold
              if (wordCount < self.options.minWordsToTriggerAutoCompletion) {
                currentAbortController?.abort();
                currentAbortController = null;
                clearTimeout(debounceTimeout);
                updatedView.dispatch(
                  updatedView.state.tr.setMeta(aiAutocompletionKey, { type: "clear" })
                );
                return;
              }

              clearTimeout(debounceTimeout);
              debounceTimeout = setTimeout(
                () => fetchSuggestion(textBefore, cursorPos),
                self.options.debounceTime
              );
            },
            destroy() {
              // Cleanup on destroy
              clearTimeout(debounceTimeout);
              currentAbortController?.abort();
              currentAbortController = null;
            },
          };
        },
      }),
    ];
  },
});
