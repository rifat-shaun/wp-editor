import { useState } from "react";
import SvgIcon from "@/components/common/SvgIcon";
import type { Editor } from "@tiptap/react";
import { Popover } from "antd";
import { LINK_FORM_MODES, LinkForm } from "../../toolbar/insert/LinkForm";
import { useLinks } from "@/hooks/useLinks";

export const LinkMenuContent = ({ editor }: { editor: Editor }) => {
	const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);
	const { linkUrl, copied, handleCopy, handleRemove } = useLinks(editor);

	return (
		<div className="flex items-center gap-1 bg-white shadow-lg rounded-lg border border-neutral-200 p-2">
			<div className="flex items-center space-x-2 min-w-0">
				<div className="flex-shrink-0 w-6 h-6 bg-gray-200 hover:text-primary-600 rounded-full flex items-center justify-center">
					<SvgIcon name="link" size={12} />
				</div>
				<a href={linkUrl} target="_blank" className="text-sm text-blue-600 truncate max-w-[200px]" title={linkUrl}>
					{linkUrl}
				</a>
			</div>

			<div className="h-5 w-px bg-gray-300"></div>

			<div className="flex items-center space-x-1">
				<button
					onClick={handleCopy}
					className={`p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors ${copied ? "text-green-600" : "text-gray-600"}`}
					title={copied ? "Copied!" : "Copy link"}
				>
					<SvgIcon name={copied ? "check" : "copy"} size={16} strokeWidth={3} />
				</button>

				<Popover
					content={
						<LinkForm
							editor={editor}
							mode={LINK_FORM_MODES.EDIT}
							initialUrl={linkUrl}
							onSubmit={() => setIsEditPopoverOpen(false)}
							onCancel={() => setIsEditPopoverOpen(false)}
						/>
					}
					trigger="click"
					placement="bottom"
					arrow={false}
					open={isEditPopoverOpen}
					onOpenChange={setIsEditPopoverOpen}
				>
					<button
						onMouseDown={(e) => e.preventDefault()}
						className="p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors"
						title="Edit link"
					>
						<SvgIcon name="edit" size={16} strokeWidth={3} />
					</button>
				</Popover>

				<button
					onClick={handleRemove}
					className="p-1.5 hover:bg-gray-100 hover:text-primary-600 rounded transition-colors"
					title="Remove link"
				>
					<SvgIcon name="node-delete" size={16} strokeWidth={3} />
				</button>
			</div>
		</div>
	);
};