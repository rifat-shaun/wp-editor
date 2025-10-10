import { useEditorShell } from "@/contexts/EditorShellContext";

export const useExport = () => {
	const { editor } = useEditorShell();

	const downloadTextFile = () => {
		if (!editor?.getText) return;

		const text = editor.getText();
		const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

		const filename = 'Untitled document';

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const downloadJsonFile = () => {
		if (!editor?.getJSON) return;

		const json = editor.getJSON();
		const filename = 'Untitled document';
		const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url); // cleanup
	};

	const downloadMarkdownFile = () => {
		if (!editor?.getText) return;

		const text = editor.getText();
		const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });

		const filename = 'Untitled document';

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const downloadHtmlFile = () => {
		if (!editor?.getHTML) return;

		const html = editor.getHTML();
		const blob = new Blob([html], { type: 'text/html;charset=utf-8' });

		const filename = 'Untitled document';

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.html`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return {
		downloadTextFile,
		downloadJsonFile,
		downloadMarkdownFile,
		downloadHtmlFile,
	};
};