import { useFontStyleMethods } from "@/hooks/useFontStyleMethods";
import type { Editor } from "@tiptap/react";
import { Button } from "../base/Button";
import SvgIcon from "../common/SvgIcon";

export const FontSizeStepper = ({ editor }: { editor: Editor }) => {
	const { decreaseFontSize, increaseFontSize } = useFontStyleMethods(editor);

	return (
		<>
			<Button
				title="Decrease Font Size"
				onClick={decreaseFontSize}
				disabled={!editor.isEditable}
				active={false}
			>
				<SvgIcon name="font-size-decrease" strokeWidth={1.5} />
			</Button>
			<Button
				title="Increase Font Size"
				onClick={increaseFontSize}
				disabled={!editor.isEditable}
				active={false}
			>
				<SvgIcon name="font-size-increase" strokeWidth={1.5} />
			</Button>
		</>
	);
};