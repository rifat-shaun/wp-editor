import { createContext, useContext, useEffect } from "react";
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
	useEffect(() => {
		if (editor && editorConfig?.onEditorReady) {
			const insertVariable = (key: string, value?: string) => {
				if (value && editorConfig.variableValues) {
					editor.commands.updateVariableValues({ [key]: value });
				}
				editor.commands.insertVariable(key);
			};

			editorConfig.onEditorReady({ insertVariable });
		}
	}, [editor, editorConfig]);

	useEffect(() => {
		if (editor && editorConfig?.variableValues) {
			editor.commands.updateVariableValues(editorConfig.variableValues);
		}
	}, [editor, editorConfig?.variableValues]);

	return (
		<EditorShellContext.Provider value={{ editor, editorConfig }}>
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

