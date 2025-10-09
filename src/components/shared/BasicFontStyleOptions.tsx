import { useFontStyleMethods } from "@/hooks/useFontStyleMethods";
import { useTiptapEditorState } from "@/hooks/useTiptapEditorState";
import type { Editor } from "@tiptap/react";
import { Button } from "../base";
import SvgIcon from "../common/SvgIcon";

export const BasicFontStyleOptions = ({
	editor,
}: {
	editor: Editor;
}) => {
	const {
		canBold,
		isBold,
		canItalic,
		isItalic,
		canUnderline,
		isUnderline,
		canStrike,
		isStrike,
	} = useTiptapEditorState(editor);

	const {
		handleToggleBold,
		handleToggleItalic,
		handleToggleUnderline,
		handleToggleStrike,
	} = useFontStyleMethods(editor);

	return (
		<>
			<Button
				title="Bold"
				onClick={handleToggleBold}
				disabled={!canBold}
				active={isBold}
			>
				<SvgIcon name="bold" strokeWidth={1.5} />
			</Button>

			<Button
				title="Italic"
				onClick={handleToggleItalic}
				disabled={!canItalic}
				active={isItalic}
			>
				<SvgIcon name="italic" strokeWidth={1.5} />
			</Button>

			<Button
				title="Underline"
				onClick={handleToggleUnderline}
				disabled={!canUnderline}
				active={isUnderline}
			>
				<SvgIcon name="underline" strokeWidth={1.5} />
			</Button>

			<Button
				title="Strikethrough"
				onClick={handleToggleStrike}
				disabled={!canStrike}
				active={isStrike}
			>
				<SvgIcon name="strikethrough" strokeWidth={1.5} />
			</Button>
		</>
	);
};