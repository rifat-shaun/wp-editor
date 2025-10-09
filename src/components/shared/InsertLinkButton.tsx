import { TOOLBAR_TYPES_ENUM, type TToolbarType } from "@/constants/Toolbar";
import { useLinks } from "@/hooks/useLinks";
import type { Editor } from "@tiptap/react";
import { Popover } from "antd";
import { useCallback, useState } from "react";
import { LinkForm } from "../toolbar/insert/LinkForm";
import { LINK_FORM_MODES } from "@/constants/LinkConstants";
import { Button } from "../base";
import SvgIcon from "../common/SvgIcon";
import { ArrowDropDownOutlined } from "@mui/icons-material";

export const InsertLinkButton = ({ editor, activeToolbarType }: { editor: Editor, activeToolbarType?: TToolbarType }) => {
	const { getSelectionLinkValues } = useLinks(editor);
	const isProfessionalToolbarActive = activeToolbarType === TOOLBAR_TYPES_ENUM.PROFESSIONAL;
	const isClassicToolbarActive = activeToolbarType === TOOLBAR_TYPES_ENUM.CLASSIC;

	const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);

	const handleLinkFormClose = useCallback(() => setIsLinkFormOpen(false), []);
	const handleLinkFormOpen = useCallback(() => setIsLinkFormOpen(true), []);

	const buttonSize = isProfessionalToolbarActive ? "medium" : "small";

	return (
		<Popover
			content={
				<LinkForm
					editor={editor}
					mode={LINK_FORM_MODES.INSERT}
					{...getSelectionLinkValues()}
					onSubmit={handleLinkFormClose}
					onCancel={handleLinkFormClose}
				/>
			}
			trigger="click"
			placement="bottom"
			arrow={false}
			open={isLinkFormOpen}
			onOpenChange={setIsLinkFormOpen}
		>
			<Button size={buttonSize} onClick={handleLinkFormOpen} title="Insert Link">
				{isProfessionalToolbarActive ? (
					<div className="relative flex flex-col items-center gap-1">
						<div className="flex items-center gap-1">
							<SvgIcon name="link" size={20} strokeWidth={1.5} />
							<ArrowDropDownOutlined
								sx={{ fontSize: "16px", color: "inherit" }}
							/>
						</div>
						<span className="text-xs">Link</span>
					</div>
				) : (
					<div className="relative flex items-center gap-1">
						<SvgIcon name="link" strokeWidth={1.5} />
						{isClassicToolbarActive && (<span className="text-xs">Link</span>)}
						<ArrowDropDownOutlined
							sx={{ fontSize: "14px", color: "inherit" }}
						/>
					</div>
				)}
			</Button>
		</Popover>
	)
};