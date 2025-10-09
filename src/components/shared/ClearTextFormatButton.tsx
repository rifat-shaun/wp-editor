import type { Editor } from "@tiptap/react";
import { Button } from "../base";
import SvgIcon from "../common/SvgIcon";
import { useHomeOptionMethods } from "@/hooks/useHomeOptionMethods";

export const ClearTextFormatButton = ({ editor }: { editor: Editor }) => {
	const { handleClearFormatting } = useHomeOptionMethods(editor);

	return (
		<Button
			onClick={handleClearFormatting}
			title="Clear formatting"
		>
			<SvgIcon name="clear-format" strokeWidth={1.5} />
		</Button>
	);
};