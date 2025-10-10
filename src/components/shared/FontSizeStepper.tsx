import { useFontStyleMethods } from "@/hooks/useFontStyleMethods";
import { Button } from "../base/Button";
import SvgIcon from "../common/SvgIcon";

export const FontSizeStepper = () => {
	const { decreaseFontSize, increaseFontSize, isEditable } = useFontStyleMethods();

	return (
		<>
			<Button
				title="Decrease Font Size"
				onClick={decreaseFontSize}
				disabled={!isEditable}
				active={false}
			>
				<SvgIcon name="font-size-decrease" strokeWidth={1.5} />
			</Button>
			<Button
				title="Increase Font Size"
				onClick={increaseFontSize}
				disabled={!isEditable}
				active={false}
			>
				<SvgIcon name="font-size-increase" strokeWidth={1.5} />
			</Button>
		</>
	);
};