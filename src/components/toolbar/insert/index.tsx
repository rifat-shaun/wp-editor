import { useState } from "react";
import { Editor } from "@tiptap/react";
import SvgIcon from "@/components/common/SvgIcon";
import { Popover } from "antd";
import { LINK_FORM_MODES, LinkForm } from "./LinkForm";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { useLinks } from "@/hooks/useLinks";

export const InsertOptions = ({ editor }: { editor: Editor }) => {
	const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);
	const { getSelectionLinkValues } = useLinks(editor);

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
				<div className={`flex items-center cursor-pointer`}>
					<SvgIcon name="link" size={18} />
					<ArrowDropDownOutlined />
				</div>
			</Popover>
		</>
	)
}