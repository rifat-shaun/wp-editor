import { useState } from "react";
import { Editor } from "@tiptap/react";
import SvgIcon from "@/components/common/SvgIcon";
import { Popover } from "antd";
import { LinkForm } from "./LinkForm";
import { LINK_FORM_MODES } from "../../../constants/linkConstants";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { useLinks } from "@/hooks/useLinks";
import { Button } from "@/components/base";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";

export const InsertOptions = ({ editor }: { editor: Editor }) => {
	const { getSelectionLinkValues } = useLinks(editor);
	const { currentToolbar } = useToolbar();
	const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

	const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);

	const handleOpenChange = (isOpen: boolean) => {
		setIsLinkFormOpen(isOpen);
	};

	return (
		<>
			<Popover
				content={
					<LinkForm
						editor={editor}
						mode={LINK_FORM_MODES.INSERT}
						{...getSelectionLinkValues()}
						onSubmit={() => setIsLinkFormOpen(false)}
						onCancel={() => setIsLinkFormOpen(false)}
					/>
				}
				trigger="click"
				placement="bottom"
				arrow={false}
				open={isLinkFormOpen}
				onOpenChange={handleOpenChange}
			>
				<Button
					size={isClassicToolbar ? "medium" : "large"}
					onClick={() => setIsLinkFormOpen(true)}
					title="Insert Link"
					className="flex items-center gap-1"
				>
					<SvgIcon name="link" size={isClassicToolbar ? "18px" : "32px"} strokeWidth={2} />
					<ArrowDropDownOutlined sx={{ fontSize: isClassicToolbar ? "18px" : "22px", color: 'inherit' }} />
				</Button>
			</Popover>
		</>
	)
}