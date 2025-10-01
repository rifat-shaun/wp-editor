import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface AIAutocompletionOptions {
  apiEndpoint: string;
  triggerWordCount: number;
  debounceTime: number;
  isEnabled: boolean;
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

const aiAutocompletionKey = new PluginKey<PluginState>("ai-autocompletion");

export const AIAutocompletion = Extension.create<AIAutocompletionOptions>({
  name: "aiAutoCompletion",

  addOptions() {
    return {
      apiEndpoint: `https://dev2.lambdax.ai/api/v1/lax-ai-editor/public/completions`,
      triggerWordCount: 5,
      debounceTime: 100,
      isEnabled: false,
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
        ({ editor }) => {
          const pluginState = aiAutocompletionKey.getState(editor.state);
          if (!pluginState?.suggestion) return false;

          const { to, text } = pluginState.suggestion;
          editor.commands.insertContentAt(to, text);
          editor.view.dispatch(
            editor.state.tr.setMeta(aiAutocompletionKey, { type: "clear" })
          );

          return true;
        },

      dismissSuggestion:
        () =>
        ({ editor }) => {
          editor.view.dispatch(
            editor.state.tr.setMeta(aiAutocompletionKey, { type: "clear" })
          );
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
                span.className = "lax-ai-suggestion";
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

          handleKeyDown(view, event) {
            const pluginState = this.getState(view.state);
            if (!pluginState?.suggestion) return false;

            if (event.key === "Tab") {
              event.preventDefault();
              view.dispatch(
                view.state.tr
                  .insertText(
                    pluginState.suggestion.text,
                    pluginState.suggestion.to,
                    pluginState.suggestion.to
                  )
                  .setMeta(aiAutocompletionKey, { type: "clear" })
              );
              return true;
            }

            if (event.key === "Escape") {
              event.preventDefault();
              view.dispatch(
                view.state.tr.setMeta(aiAutocompletionKey, { type: "clear" })
              );
              return true;
            }

            return false;
          },
        },

        view(view) {
          const fetchSuggestion = async (text: string, position: number) => {
            if (!self.storage.isEnabled) return;

            currentAbortController?.abort();
            currentAbortController = new AbortController();

            try {
              const response = await fetch(self.options.apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  text,
                  model: "local",
                  stream: false,
                  max_tokens: 3 + Math.floor(Math.random() * 6),
                }),
                signal: currentAbortController.signal,
              });

              if (!response.ok)
                throw new Error("Failed to fetch AI suggestion");

              const data = await response.json();
              if (data.completion) {
                view.dispatch(
                  view.state.tr.setMeta(aiAutocompletionKey, {
                    type: "setSuggestion",
                    suggestion: {
                      from: position - text.length,
                      to: position,
                      text: data.completion,
                    },
                  })
                );
              }
            } catch (error) {
              if (error instanceof Error && error.name !== "AbortError") {
                console.error(error);
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

              if (wordCount < self.options.triggerWordCount) {
                currentAbortController?.abort();
                currentAbortController = null;
                return;
              }

              clearTimeout(debounceTimeout);
              debounceTimeout = setTimeout(
                () => fetchSuggestion(textBefore, cursorPos),
                self.options.debounceTime
              );
            },
          };
        },
      }),
    ];
  },
});
