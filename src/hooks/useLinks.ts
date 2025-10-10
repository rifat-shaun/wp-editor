import { useState, useEffect } from "react";
import { useEditorShell } from "@/contexts/EditorShellContext";
import type { Mark } from "@tiptap/pm/model";

export const useLinks = () => {
	const { editor } = useEditorShell();
	const [linkUrl, setLinkUrl] = useState('');
	const [copied, setCopied] = useState(false);

	const shouldShowLinkOnBubbleMenu = ({ state }: { state: any }) => {
		const { from, to } = state.selection;
		// Don't show if there's a selection
		if (from !== to) return false;

		// Cursor position - check if on a link mark
		const marks = state.doc.resolve(from).marks();
		return marks.some((mark: Mark) => mark.type.name === 'link');
	};

	const handleCopy = () => {
		if (!linkUrl) return;
		navigator.clipboard.writeText(linkUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 200);
	};

	const handleRemove = () => {
		if (!editor) return;
		editor.chain().focus().unsetLink().run();
	};

	const normalizeAndValidateUrl = (url: string): string | null => {
		if (!url || !url.trim()) return null;

		let normalizedUrl = url.trim();

		// Add https:// if no protocol is provided
		if (!/^https?:\/\//i.test(normalizedUrl)) {
			normalizedUrl = `https://${normalizedUrl}`;
		}

		// Basic URL validation
		try {
			const urlObj = new URL(normalizedUrl);
			return urlObj.href;
		} catch {
			return null;
		}
	};

	const handleInsertLink = (url: string, text?: string) => {
		if (!editor || !url) return;

		const validatedUrl = normalizeAndValidateUrl(url);
		if (!validatedUrl) return;

		if (text) {
			editor.chain().focus().insertContent(`<a href="${validatedUrl}">${text}</a>`).run();
		} else {
			editor.chain().focus().setLink({ href: validatedUrl }).run();
		}
	};

	const handleEditLink = (url: string) => {
		if (!editor || !url) return;

		const validatedUrl = normalizeAndValidateUrl(url);
		if (!validatedUrl) return;

		editor.chain().focus().extendMarkRange('link').setLink({ href: validatedUrl }).run();
	};

	const getSelectionLinkValues = () => {
		if (!editor) return { initialUrl: '', initialText: '' };

		const { state } = editor;
		const { from, to } = state.selection;
		const selectedText = state.doc.textBetween(from, to, ' ');
		const linkUrl = editor.getAttributes('link').href || '';

		return {
			initialUrl: linkUrl,
			initialText: selectedText,
		};
	};

	// Track current link URL from editor
	useEffect(() => {
		if (!editor) return;

		const updateLinkUrl = () => {
			const href = editor.getAttributes('link').href || '';
			setLinkUrl(href);
		};

		// Initial update
		updateLinkUrl();

		// Update on selection changes
		editor.on('selectionUpdate', updateLinkUrl);
		editor.on('transaction', updateLinkUrl);

		return () => {
			editor.off('selectionUpdate', updateLinkUrl);
			editor.off('transaction', updateLinkUrl);
		};
	}, [editor]);

	return {
		linkUrl,
		copied,
		shouldShowLinkOnBubbleMenu,
		handleCopy,
		handleRemove,
		handleInsertLink,
		handleEditLink,
		getSelectionLinkValues,
	};
};