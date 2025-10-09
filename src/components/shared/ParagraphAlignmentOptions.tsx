import { useParagraphStyleMethods } from "@/hooks/useParagraphStyleMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import type { Editor } from "@tiptap/react";
import SvgIcon from "../common/SvgIcon";
import { Button } from "../base";

type TParagraphAlignmentOptionsProps = {
	editor: Editor;
};

export const ParagraphAlignmentOptions = ({
	editor,
}: TParagraphAlignmentOptionsProps) => {
	const {
		isTextAlignLeft,
		isTextAlignCenter,
		isTextAlignRight,
		isTextAlignJustify,
	} = useTiptapEditorState(editor);

	const {
		handleTextAlignLeft,
		handleTextAlignCenter,
		handleTextAlignRight,
		handleTextAlignJustify,
	} = useParagraphStyleMethods(editor);

	return (
		<>
			<Button
				title="Align Left"
				onClick={handleTextAlignLeft}
				active={isTextAlignLeft}
				size="small"
			>
				<SvgIcon name="align-left" />
			</Button>

			<Button
				title="Align Center"
				onClick={handleTextAlignCenter}
				active={isTextAlignCenter}
				size="small"
			>
				<SvgIcon name="align-center" />
			</Button>

			<Button
				title="Align Right"
				onClick={handleTextAlignRight}
				active={isTextAlignRight}
				size="small"
			>
				<SvgIcon name="align-right" />
			</Button>

			<Button
				title="Justify"
				onClick={handleTextAlignJustify}
				active={isTextAlignJustify}
				size="small"
			>
				<SvgIcon name="align-justify" />
			</Button>
		</>
	);
};