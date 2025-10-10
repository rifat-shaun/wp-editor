
import { Button } from "../base";
import SvgIcon from "../common/SvgIcon";
import { useHomeOptionMethods } from "@/hooks/useHomeOptionMethods";

export const ClearTextFormatButton = () => {
	const { handleClearFormatting } = useHomeOptionMethods();

	return (
		<Button
			onClick={handleClearFormatting}
			title="Clear formatting"
		>
			<SvgIcon name="clear-format" strokeWidth={1.5} />
		</Button>
	);
};