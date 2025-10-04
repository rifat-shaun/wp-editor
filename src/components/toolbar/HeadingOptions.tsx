import { Editor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ToolbarButtonItem } from './ToolbarButtonItem';
import SvgIcon from '../common/SvgIcon';
import { HEADING_OPTIONS } from '@/constants/Heading';
import { useTiptapEditorState } from '@/hooks/useTiptapEditorState';

type THeadingOptionsProps = {
	editor: Editor;
};

export const HeadingOptions = ({ editor }: THeadingOptionsProps) => {
	const { selectionHeadingLevel } = useTiptapEditorState(editor);
	const headingsContainerRef = useRef<HTMLDivElement>(null);
	const expandableContainerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [shouldUseContentWidth, setShouldUseContentWidth] = useState(false);

	useEffect(() => {
		if (isOpen && headingsContainerRef.current) {
			const rect = headingsContainerRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;

			if (rect.right + (Math.min(rect.left, 0) - 100) >= rect.width) {
				setShouldUseContentWidth(false);
				setPosition({
					top: rect.bottom + window.scrollY - 6,
					left: rect.left + window.scrollX,
				});

				return;
			}

			// Check if there's enough space on the left
			const hasEnoughSpaceOnLeft = rect.width <= windowWidth - 20; // 20px buffer

			if (hasEnoughSpaceOnLeft) {
				setPosition({
					top: rect.bottom + window.scrollY - 6,
					left: (windowWidth - rect.width) / 2,
				});
				setShouldUseContentWidth(true);
			} else {
				// Position to the right if not enough space on left
				setPosition({
					top: rect.bottom + window.scrollY - 6,
					left: Math.max(windowWidth - rect.width - 20, 0) + window.scrollX, // Ensure it stays within viewport
				});
				setShouldUseContentWidth(true);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				headingsContainerRef.current &&
				!headingsContainerRef.current.contains(event.target as Node) &&
				expandableContainerRef.current &&
				!expandableContainerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleHeadingChange = (headingType: string | number) => {
		if (!editor) return;

		if (headingType === 'paragraph') {
			editor.chain().focus().setParagraph().run();
		} else if (typeof headingType === 'string' && headingType.startsWith('h')) {
			const level = parseInt(headingType.substring(1), 10);
			if (level >= 1 && level <= 6) {
				editor
					.chain()
					.focus()
					.setHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
					.run();
			}
		}
	};

	const headingRenderer = (option: { label: string; value: string }) => {
		const value = option.value;
		let style = {};

		switch (value) {
			case 'h1':
				style = { fontSize: '1rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			case 'h2':
				style = { fontSize: '0.9rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			case 'h3':
				style = { fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			case 'h4':
				style = { fontSize: '0.75rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			case 'h5':
				style = { fontSize: '0.7rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			case 'h6':
				style = { fontSize: '0.65rem', fontWeight: 'bold', lineHeight: '1.2' };
				break;
			default:
				style = { fontSize: '0.6rem', lineHeight: '1.2' };
				break;
		}

		return <span style={style}>{option.label}</span>;
	};

	return (
		<div className={`flex items-center relative h-12 min-w-fit bg-gray-100`}>
			<div ref={headingsContainerRef} className={`flex flex-col items-center bg-gray-100 rounded-md p-2 ${isOpen ? 'rounded-b-none' : ''}`}>
				<div className='flex items-center gap-2'>
					{HEADING_OPTIONS?.slice(0, 4)?.map((option) => (
						<ToolbarButtonItem
							key={option.value}
							tooltip={option.label}
							onClick={() => handleHeadingChange(option.value)}
							active={selectionHeadingLevel === option.value}
							className={`rounded-md h-9 w-fit ${selectionHeadingLevel === option.value ? 'bg-primary-100' : 'bg-white'}`}
						>
							<div className='w-24 h-full flex flex-col items-center justify-between'>
								{headingRenderer(option)}
								<div className='text-[8px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
							</div>
						</ToolbarButtonItem>
					))}

					<div className='flex items-center justify-center' onClick={() => setIsOpen(!isOpen)}>
						<SvgIcon name='arrow-down' className={`cursor-pointer ${isOpen ? 'rotate-180' : ''}`} />
					</div>
				</div>
			</div>

			{isOpen &&
				createPortal(
					<div
						className='z-50 absolute bg-gray-100 p-2 rounded-b-md shadow-lg'
						style={{
							top: `${position.top}px`,
							left: `${position.left}px`,
							width: shouldUseContentWidth ? 'auto' : headingsContainerRef.current?.offsetWidth,
						}}
						ref={expandableContainerRef}
					>
						<div className='flex items-center gap-2 w-full'>
							{HEADING_OPTIONS?.slice(4, 7)?.map((option) => (
								<ToolbarButtonItem
									key={option.value}
									tooltip={option.label}
									onClick={() => {
										handleHeadingChange(option.value);
										setIsOpen(false);
									}}
									active={selectionHeadingLevel === option.value}
									className={`rounded-md h-9 w-fit ${selectionHeadingLevel === option.value ? 'bg-primary-100' : 'bg-white'}`}
								>
									<div className='w-24 h-full flex flex-col items-center justify-between'>
										{headingRenderer(option)}
										<div className='text-[8px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
									</div>
								</ToolbarButtonItem>
							))}
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
};
