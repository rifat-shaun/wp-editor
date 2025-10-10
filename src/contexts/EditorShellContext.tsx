import { createContext, useContext, useEffect, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import type { EditorConfig } from "@/config/editorConfig";

export interface EditorShellContextType {
	editor: Editor;
	editorConfig: EditorConfig;
}

const EditorShellContext = createContext<EditorShellContextType | undefined>(undefined);

interface EditorShellProviderProps {
	children: ReactNode;
	editor: Editor;
	editorConfig: EditorConfig;
}

export const EditorShellProvider = ({ children, editor, editorConfig }: EditorShellProviderProps) => {
	const insertVariable = useCallback(
		(key: string, value?: string) => {
			if (value) {
				editor.commands.insertVariable(key, value);
			} else {
				editor.commands.insertVariable(key);
			}
		},
		[editor]
	);

	const updateVariableValues = useCallback(
		(values: Record<string, string>) => {
			editor.commands.updateVariableValues(values);
		},
		[editor]
	);

	useEffect(() => {
		if (editor && editorConfig?.onEditorReady) {
			editorConfig.onEditorReady({ insertVariable, updateVariableValues });
		}
	}, [editor, editorConfig, insertVariable, updateVariableValues]);

	const providerValue = useMemo(
		() => ({ editor, editorConfig }),
		[editor, editorConfig]
	);

	return (
		<EditorShellContext.Provider value={providerValue}>
			{children}
		</EditorShellContext.Provider>
	);
};

/* eslint-disable react-refresh/only-export-components */
export const useEditorShell = () => {
	const context = useContext(EditorShellContext);
	if (!context) {
		throw new Error("useEditorShell must be used within an EditorShellProvider");
	}
	return context;
};

