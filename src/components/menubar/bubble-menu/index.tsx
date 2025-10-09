import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { DefaultBubbleMenuContent } from "./DefaultBubbleMenuContent";
import { LinkMenuContent } from "./LinkMenuContent";
import { useLinks } from "@/hooks/useLinks";
import { ImageMenuContent } from "@/extensions/CustomImage/ImageMenuContent";

export const BubbleMenus = ({ editor }: { editor: Editor }) => {
	const { shouldShowLinkOnBubbleMenu } = useLinks();

	const isDefaultBubbleMenuOff = () => {
		return !editor.isActive('image');
	};

	return (
		<>
			<BubbleMenu editor={editor} shouldShow={isDefaultBubbleMenuOff} options={{ placement: "bottom", shift: { crossAxis: true } }}>
				<DefaultBubbleMenuContent editor={editor} />
			</BubbleMenu>

			<BubbleMenu editor={editor} shouldShow={shouldShowLinkOnBubbleMenu} options={{ placement: "bottom", shift: { crossAxis: true } }}>
				<LinkMenuContent editor={editor} />
			</BubbleMenu>
			
		<BubbleMenu
			editor={editor}
			shouldShow={() => editor.isActive('image')}
			options={{ placement: "top", shift: { crossAxis: true } }}
		>
			<ImageMenuContent editor={editor} />
		</BubbleMenu>

		</>
	)
}


