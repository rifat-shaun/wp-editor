import { message } from "antd";
import { useCallback } from "react";
import PageSizesStyles from "@/styles/content/page-sizes.css?inline";
import ListItemsStyles from "@/styles/content/list-items.css?inline";
import QuoteStyles from "@/styles/content/quote.css?inline";
import HeadingStyles from "@/styles/content/heading.css?inline";
import TableStyles from "@/styles/content/table.css?inline";
import LinkStyles from "@/styles/content/link.css?inline";
import DividerStyles from "@/styles/content/divider.css?inline";
import CodeblockStyles from "@/styles/content/codeblock.css?inline";
import ImageStyles from "@/styles/content/image.css?inline";
import { useEditorShell } from "@/contexts/EditorShellContext";

export const useExport = () => {
	const { editor, editorConfig } = useEditorShell();

	const downloadTextFile = () => {
		if (!editor?.getText) return;

		const text = editor.getText();
		const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

		const filename = editorConfig?.file?.name || 'Untitled document';

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
		const filename = editorConfig?.file?.name || 'Untitled document';
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

		const filename = editorConfig?.file?.name || 'Untitled document';

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

		const filename = editorConfig?.file?.name || 'Untitled document';

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${filename}.html`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const downloadPdfFile = useCallback(() => {
		try {
		// Get filename from config
		const filename = editorConfig?.file?.name || 'Untitled document';

		// Get content
		const content = document.querySelector('.editor-content')?.outerHTML || '';

		// Get page configuration
		let orientation = 'portrait';
		let size = { width: 210, height: 297 };
		let backgroundColor = 'white';

			const editorContainer = document.querySelector('.editor-content');

			if (editorContainer instanceof HTMLElement) {
				const width = editorContainer.style.width;
				const height = editorContainer.style.height;

				if (width && height) {
					size = { width: parseFloat(width), height: parseFloat(height) };
				}
			}

			// Get background color from ProseMirror element
			const proseMirror = document.querySelector('.editor-content');
			if (proseMirror instanceof HTMLElement) {
				const bgColor = window.getComputedStyle(proseMirror).backgroundColor;
				if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
					backgroundColor = bgColor;
				}
			}

		try {
			const orientationAttr = document.body.getAttribute('data-page-orientation');

			if (orientationAttr) {
				orientation = orientationAttr;
			}
		} catch (error) {
			console.error('Error parsing page orientation:', error);
		}

			// Create a hidden iframe for printing
			const iframe = document.createElement('iframe');
			iframe.style.position = 'fixed';
			iframe.style.right = '0';
			iframe.style.bottom = '0';
			iframe.style.width = '0';
			iframe.style.height = '0';
			iframe.style.border = 'none';
			document.body.appendChild(iframe);

			// Get iframe document and write content
			const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
			if (!iframeDoc) {
				throw new Error('Could not access iframe document');
			}

			// Write content with styles to make everything visible
			iframeDoc.open();
			iframeDoc.write(`
			<!DOCTYPE html>
			<html>
			  <head>
				<title>${filename}</title>
				<style>
				  * { 
					overflow: visible !important;
					max-height: none !important;
				  }
				  
				  body {
					background-color: ${backgroundColor};
					margin: 0;
					padding: 0;
				  }
				  
				  @page {
					 size: ${orientation === 'landscape' ? `${size?.height}mm ${size?.width}mm` : `${size?.width}mm ${size?.height}mm`}; 
					 margin: 0;
					}
				  
				  @media print {
					body, html {
						height: auto;
						overflow: visible;
					}
					.editor-page-break {
						page-break-after: always;
						break-after: always;
					}
					.editor-page-break-line {
						display: none;
					}
					.variable-text:not([data-value]),
					.variable-text[data-value=""] {
						display: none;
					}
				  }
					${PageSizesStyles}
					${ListItemsStyles}
					${QuoteStyles}
					${HeadingStyles}
					${TableStyles}
					${LinkStyles}
					${DividerStyles}
					${CodeblockStyles}
					${ImageStyles}
				</style>
			  </head>
			  <body>
				<div id="print-container" style="width: 100%; overflow: visible !important;">
				  ${content}
				</div>
			  </body>
			</html>
		  `);
			iframeDoc.close();

			// Store the original main document title
			const originalTitle = document.title;

			// Explicitly set the document title for the print dialog
			if (iframe.contentWindow) {
				iframe.contentWindow.document.title = filename;
			}
			
			// Also temporarily change the main document title (some browsers use this)
			document.title = filename;

			// Add a short delay to ensure the title is set before printing
			setTimeout(() => {
				// Set title again just before printing
				if (iframe.contentWindow) {
					iframe.contentWindow.document.title = filename;
				}
				document.title = filename;
			}, 100);

			// Print after a short delay
			setTimeout(() => {
				try {
					// Add special print handling instructions
					if (iframe.contentWindow) {
						// Attempt to add instructions to browser print dialog if supported
						if (iframe.contentWindow.matchMedia) {
							const mediaQueryList = iframe.contentWindow.matchMedia('print');
							mediaQueryList.addEventListener('change', function (mql) {
								if (!mql.matches) {
									// Print dialog was closed
									document.title = originalTitle;
									document.body.removeChild(iframe);
								}
							});
						}

						iframe.contentWindow.document.title = filename || 'Untitled document';
						iframe.contentWindow.focus();
						iframe.contentWindow.print();

					// Fallback cleanup method if event listener doesn't work
					setTimeout(() => {
						if (document.body.contains(iframe)) {
							document.body.removeChild(iframe);
						}
						// Restore original title
						document.title = originalTitle;
					}, 1000);
					} else {
						throw new Error('Cannot access iframe content window');
					}
			} catch (err) {
				document.body.removeChild(iframe);
				document.title = originalTitle;
				message.error('Failed to export: ' + String(err));
			}
		}, 1000);
	} catch (error) {
		message.error('Failed to export: ' + String(error));
	}
}, [editorConfig]);


	return {
		downloadTextFile,
		downloadJsonFile,
		downloadMarkdownFile,
		downloadHtmlFile,
		downloadPdfFile,
	};
};