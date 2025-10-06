import { usePageMethods } from "@/hooks/usePageMethods";
import { Editor } from "@tiptap/react";
import { ItemGroup } from "../ItemGroup";

export const PageOptions = ({ editor }: { editor: Editor }) => {
	const { } = usePageMethods(editor);
	return (
		<>
			<ItemGroup>
				hello
			</ItemGroup>
		</>
	)
}