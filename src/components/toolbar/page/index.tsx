import { ItemGroup } from "../ItemGroup";
import PageSizeSelector from "./PageSizeSelector";
import { Button } from "@/components/base";
import { Popover } from "antd";
import { useState } from "react";
import SvgIcon from "@/components/common/SvgIcon";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { Divider } from "../Divider";
import { useToolbar } from "@/contexts/ToolbarContext";
import { TOOLBAR_TYPES_ENUM } from "@/constants/Toolbar";
import PageOrientationSelector from "./PageOrientationSelector";
import { PageMarginPicker } from "./PageMarginPicker";
import { Editor } from "@tiptap/react";
import { PAGE_BACKGROUND_COLORS } from "@/constants/PageBackground";
import { PageBackgroundColorPicker } from "./PageBackgroundColorPicker";

export const PageOptions = ({ editor }: { editor: Editor }) => {
	const { pageConfig, setPageConfig, currentToolbar, onPresentationModeToggle } = useToolbar();
	const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

	const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
	const [isPageOrientationOpen, setIsPageOrientationOpen] = useState(false);
	const [isPageMarginsOpen, setIsPageMarginsOpen] = useState(false);
	const [selectedBGColor, setSelectedBGColor] = useState(PAGE_BACKGROUND_COLORS[0].value);

	const handleSetPageBackgroundColor = (color: string) => {
		setSelectedBGColor(color);
		editor.chain().focus().setPageBackgroundColor(color).run();
	}

	return (
		<>
			<ItemGroup>
				<Popover
					content={
						<PageMarginPicker
							editor={editor}
							onClose={() => setIsPageMarginsOpen(false)}
							pageOrientation={pageConfig.orientation}
							setPageOrientation={(orientation) => {
								setPageConfig({ ...pageConfig, orientation });
							}}
						/>
					}
					trigger="click"
					placement="bottom"
					arrow={false}
					open={isPageMarginsOpen}
					onOpenChange={setIsPageMarginsOpen}
				>
					<Button
						onClick={() => setIsPageMarginsOpen(true)}
						title="Page Margin"
						size={isClassicToolbar ? "small" : "medium"}
					>
						{isClassicToolbar ? (
							<div className="relative flex items-center gap-1">
								<SvgIcon
									name="page-margin"
									strokeWidth={1.5}
								/>
								<span className="text-xs">Margin</span>
								<ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
							</div>
						) : (
							<div className="relative flex flex-col items-center gap-1">
								<div className="flex items-center gap-1">
									<SvgIcon
										name="page-margin"
										strokeWidth={1.5}
										size={20}
									/>
									<ArrowDropDownOutlined sx={{ fontSize: "16px", color: "inherit" }} />
								</div>
								<span className="text-xs">Margin</span>
							</div>
						)}
					</Button>
				</Popover>
			</ItemGroup>

			<ItemGroup>
				<Popover
					content={
						<PageSizeSelector
							selectedSize={pageConfig.size}
							onSizeChange={(size) => setPageConfig({ ...pageConfig, size })}
						/>
					}
					trigger="click"
					placement="bottom"
					arrow={false}
					open={isPageSizeOpen}
					onOpenChange={setIsPageSizeOpen}
				>
					<Button
						onClick={() => setIsPageSizeOpen(true)}
						title="Page Size"
						className="flex items-center gap-1"
					>
						<SvgIcon
							name="page-size"
							strokeWidth={1.5}
						/>
						<span className="text-xs">Size</span>
						<ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
					</Button>
				</Popover>

				<Popover
					content={
						<PageOrientationSelector
							selectedOrientation={pageConfig.orientation}
							onOrientationChange={(orientation) => setPageConfig({ ...pageConfig, orientation })}
						/>
					}
					trigger="click"
					placement="bottom"
					arrow={false}
					open={isPageOrientationOpen}
					onOpenChange={setIsPageOrientationOpen}
				>
					<Button
						onClick={() => setIsPageOrientationOpen(true)}
						title="Page Orientation"
						className="flex items-center gap-1"
					>
						<SvgIcon
							name="page-orientation"
							strokeWidth={1.5}
						/>
						<span className="text-xs">Orientation</span>
						<ArrowDropDownOutlined sx={{ fontSize: "14px", color: "inherit" }} />
					</Button>
				</Popover>
			</ItemGroup>

			<Divider />

			<PageBackgroundColorPicker
				id="pageBackgroundColor"
				selectedBGColor={selectedBGColor}
				setSelectedBGColor={handleSetPageBackgroundColor}
			/>

			<Divider />

			<Button
				onClick={onPresentationModeToggle}
				title="Enter Presentation Mode"
				size={isClassicToolbar ? "small" : "medium"}
			>
				{isClassicToolbar ? (
					<div className="relative flex items-center gap-1">
						<SvgIcon name="preview" strokeWidth={3.5} />
						<span className="text-xs">Presentation</span>
					</div>
				) : (
					<div className="relative flex flex-col items-center gap-1">
						<SvgIcon name="preview" size={20} strokeWidth={3.5} />
						<span className="text-xs">Presentation</span>
					</div>
				)}
			</Button>
		</>
	)
}