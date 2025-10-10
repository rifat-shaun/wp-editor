import { useEditorShell } from "@/contexts/EditorShellContext";

export const useInsertOptionMethods = () => {
    const { editor } = useEditorShell();
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