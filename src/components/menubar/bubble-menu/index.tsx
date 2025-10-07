import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { DefaultBubbleMenuContent } from "./DefaultBubbleMenuContent";
import { LinkMenuContent } from "./LinkMenuContent";
import { useLinks } from "@/hooks/useLinks";

export const BubbleMenus = ({ editor }: { editor: Editor }) => {
	const { shouldShowLinkOnBubbleMenu } = useLinks();

	return (
		<>
			<BubbleMenu editor={editor} options={{ placement: "bottom", shift: { crossAxis: true } }}>
				<DefaultBubbleMenuContent editor={editor} />
			</BubbleMenu>

			<BubbleMenu editor={editor} shouldShow={shouldShowLinkOnBubbleMenu} options={{ placement: "bottom", shift: { crossAxis: true } }}>
				<LinkMenuContent editor={editor} />
			</BubbleMenu>
		</>
	)
}


