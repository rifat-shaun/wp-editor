import type { Editor } from "@tiptap/react";

export const useTableMethods = (editor: Editor) => {

	const handleInsertTable = (rows: number, cols: number, withHeaderRow: boolean) => {
    if (!editor) return;
    editor.commands.insertTable({ rows, cols, withHeaderRow });
  };

	const handleInsertRowAbove = () => {
		if (!editor) return;
		editor.chain().focus().addRowBefore().run()
	};

	const handleInsertRowBelow = () => {
		if (!editor) return;
		editor.chain().focus().addRowAfter().run();
	};

	const handleInsertColumnLeft = () => {
		if (!editor) return;
		editor.chain().focus().addColumnBefore().run();
	};

	const handleInsertColumnRight = () => {
		if (!editor) return;
		editor.chain().focus().addColumnAfter().run();
	};

	const handleDeleteColumn = () => {
		if (!editor) return;
		editor.chain().focus().deleteColumn().run();
	};

	const handleMergeCells = () => {
		if (!editor) return;
		editor.chain().focus().mergeCells().run();
	};

	const handleSplitCell = () => {
		if (!editor) return;
		editor.chain().focus().splitCell().run();
	};

	const handleDeleteTable = () => {
		if (!editor) return;
		editor.chain().focus().deleteTable().run();
	};

	return {
		handleInsertTable,
		handleInsertRowAbove,
		handleInsertRowBelow,
		handleInsertColumnLeft,
		handleInsertColumnRight,
		handleDeleteColumn,
		handleMergeCells,
		handleSplitCell,
		handleDeleteTable,
	};
};