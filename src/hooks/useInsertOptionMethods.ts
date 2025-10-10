import type { Editor } from "@tiptap/react";

export const useInsertOptionMethods = (editor: Editor) => {
    const handleInsertLineBreak = () => {
        editor.chain().focus().setHardBreak().run();
    }

    const handleInsertCodeBlock = () => {
        editor.chain().focus().setCodeBlock().run();
    }

    return {
        handleInsertLineBreak,
        handleInsertCodeBlock,
    }
}   