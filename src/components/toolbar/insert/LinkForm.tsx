import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useLinks } from "@/hooks/useLinks";
import { LINK_FORM_MODES } from "@/constants/LinkConstants";

interface LinkFormProps {
	mode: (typeof LINK_FORM_MODES)[keyof typeof LINK_FORM_MODES];
	initialUrl?: string;
	initialText?: string;
	onSubmit?: () => void;
	onCancel?: () => void;
}

export const LinkForm = ({ mode, initialUrl = "", initialText = "", onSubmit, onCancel }: LinkFormProps) => {
	const [url, setUrl] = useState(initialUrl);
	const [text, setText] = useState(initialText);
	const { handleInsertLink, handleEditLink } = useLinks();

	const clearForm = () => {
		setUrl("");
		setText("");
	};

	const handleSubmit = () => {
		if (!url) return;

		if (mode === LINK_FORM_MODES.EDIT) {
			handleEditLink(url);
		} else {
			handleInsertLink(url, text);
		}

		clearForm();
		onSubmit?.();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		} else if (e.key === 'Escape') {
			clearForm();
			onCancel?.();
		}
	};

	useEffect(() => {
		setUrl(initialUrl);
		setText(initialText);
	}, [initialUrl, initialText]);

	return (
		<div className="min-w-[320px]" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
			<div className="space-y-3">
				<div>
					<label className="block text-xs font-medium text-gray-700 mb-1">
						URL
					</label>
					<Input
						placeholder="https://example.com"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onKeyDown={handleKeyDown}
						autoFocus
					/>
				</div>

				{mode === LINK_FORM_MODES.INSERT && (
					<div>
						<label className="block text-xs font-medium text-gray-700 mb-1">
							Text (optional)
						</label>
						<Input
							placeholder="Link text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
				)}

				<div className="flex justify-end gap-2 pt-2">
					<Button size="small" onClick={onCancel}>
						Cancel
					</Button>
					<Button size="small" type="primary" onClick={handleSubmit} disabled={!url}>
						{mode === LINK_FORM_MODES.EDIT ? "Update" : "Insert"}
					</Button>
				</div>
			</div>
		</div>
	);
};