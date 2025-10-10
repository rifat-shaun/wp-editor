import { useEditorShell } from "@/contexts/EditorShellContext";

export const useHeadingStyleMethods = () => {
	const { editor } = useEditorShell();
	const handleHeadingChange = (headingType: string | number) => {
		if (!editor) return;

		if (headingType === 'paragraph') {
			editor.chain().focus().setParagraph().run();
		} else if (typeof headingType === 'string' && headingType.startsWith('h')) {
			const level = parseInt(headingType.substring(1), 10);
			if (level >= 1 && level <= 6) {
				editor.chain().focus().setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
			}
		}
	};

	return {
		handleHeadingChange,
	};
}