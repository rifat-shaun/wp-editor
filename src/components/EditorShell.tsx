import { useEditorShell } from "@/contexts/EditorShellContext";
import { usePageMethods } from "@/hooks/usePageMethods";
import { usePresentationMode } from "@/hooks/usePresentationMode";
import { Toolbar } from "./toolbar";
import { useEffect, useRef, useState } from "react";
import { EditorContent } from "@tiptap/react";
import { BubbleMenus } from "./menubar/bubble-menu";
import { Footer } from "./footer";
import { PresentationControls } from "./PresentationControls";
import ScrollbarWrapper from "./common/ScrollbarWrapper";

export const EditorShell = () => {
	const editorPageRef = useRef<HTMLDivElement>(null);
	const { editor, editorConfig } = useEditorShell();
	const { pageClass, pageConfig, setPageConfig } = usePageMethods();
	const { isPresentationMode, isLaserActive, onPresentationModeToggle, handleLaserToggle } = usePresentationMode(editor);

	const [isEditorEditable, setIsEditorEditable] = useState(editorConfig.editable && !editorConfig.asViewer && !isPresentationMode);

	useEffect(() => {
		if (!editor || !editorPageRef.current) return;

		const handleClickWithinEditorPageRef = (e: MouseEvent) => {
			if (editorPageRef.current?.contains(e.target as Node)) {
				editor.commands.focus();

				return;
			}
		};

		document.addEventListener("click", handleClickWithinEditorPageRef);
		return () => {
			document.removeEventListener("click", handleClickWithinEditorPageRef);
		};
	}, [editor]);

	useEffect(() => {
		setIsEditorEditable(editorConfig.editable && !editorConfig.asViewer && !isPresentationMode);
	}, [editorConfig.editable, editorConfig.asViewer, isPresentationMode]);

	return (
		<div className={`h-full relative flex flex-col bg-neutral-200 editor-container ${isPresentationMode ? "editor-presentation-mode" : ""} ${isLaserActive ? "laser-active" : ""}`}>
			{isEditorEditable && (
				<Toolbar
					editorConfig={editorConfig}
					// editor={editor}
					onPresentationModeToggle={onPresentationModeToggle}
					pageConfig={pageConfig}
					setPageConfig={setPageConfig}
				/>
			)}
			<ScrollbarWrapper>
				<div className="flex-1 overflow-auto">
					<div className="min-h-full w-fit min-w-full flex justify-center items-start p-4">
						<div
							className={`${editorConfig.enablePagination ? pageClass : ""} editor-content`}
							ref={editorPageRef}
						>
							<EditorContent editor={editor} />
							{isEditorEditable && (
								<BubbleMenus editor={editor} />
							)}
						</div>
					</div>
				</div>
			</ScrollbarWrapper>

			{!isPresentationMode && (
				<Footer onPresentationModeToggle={onPresentationModeToggle} />
			)}

			{isPresentationMode && (
				<PresentationControls onPresentationModeToggle={onPresentationModeToggle} onLaserToggle={handleLaserToggle} />
			)}
		</div>
	)
};