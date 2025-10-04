import { Editor } from '@tiptap/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ToolbarButtonItem } from './ToolbarButtonItem';
import SvgIcon from '../common/SvgIcon';
import { DROPDOWN_OFFSET, HEADING_OPTIONS, HEADING_STYLES, VIEWPORT_BUFFER } from '@/constants/Heading';
import { useTiptapEditorState } from '@/hooks/useTiptapEditorState';
import { useHeadingStyleMethods } from '@/hooks/useHeadingStyleMethods';
import { useToolbar } from '@/contexts/ToolbarContext';
import { TOOLBAR_TYPES_ENUM } from '@/constants/Toolbar';
import { Dropdown } from 'antd';
import { ArrowDropDownOutlined } from '@mui/icons-material';

type HeadingOptionsProps = {
	editor: Editor;
};

export const HeadingOptions = ({ editor }: HeadingOptionsProps) => {
	const { currentToolbar } = useToolbar();

	const { selectionHeadingLevel } = useTiptapEditorState(editor);
	const { handleHeadingChange } = useHeadingStyleMethods(editor);

	const headingsContainerRef = useRef<HTMLDivElement>(null);
	const expandableContainerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [shouldUseContentWidth, setShouldUseContentWidth] = useState(false);

	const handleDropdownItemClick = useCallback((optionValue: string) => {
		handleHeadingChange(optionValue);
		setIsOpen(false);
	}, [handleHeadingChange]);

	useEffect(() => {
		if (!isOpen || !headingsContainerRef.current) return;

		const rect = headingsContainerRef.current.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const top = rect.bottom + window.scrollY - DROPDOWN_OFFSET;

		// Check if dropdown fits in viewport width
		const hasEnoughSpace = rect.width <= windowWidth - VIEWPORT_BUFFER;

		if (hasEnoughSpace) {
			// Center the dropdown
			setPosition({
				top,
				left: (windowWidth - rect.width) / 2,
			});
			setShouldUseContentWidth(true);
		} else {
			// Position to the right with buffer
			setPosition({
				top,
				left: Math.max(windowWidth - rect.width - VIEWPORT_BUFFER, 0) + window.scrollX,
			});
			setShouldUseContentWidth(true);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const isOutsideContainer = !headingsContainerRef.current?.contains(target);
			const isOutsideDropdown = !expandableContainerRef.current?.contains(target);

			if (isOutsideContainer && isOutsideDropdown) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	const headingRenderer = useCallback((option: { label: string; value: string }) => {
		const style = HEADING_STYLES[option.value as keyof typeof HEADING_STYLES] || HEADING_STYLES.paragraph;
		return <span style={style}>{option.label}</span>;
	}, []);

	if (currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC) {
		const selectedHeadingTag = selectionHeadingLevel === 'paragraph' ? selectionHeadingLevel : `h${selectionHeadingLevel}`;

		return (
			<Dropdown
				menu={{
					items: HEADING_OPTIONS?.map((option) => ({
						key: option.value,
						label: headingRenderer(option),
						onClick: () => handleHeadingChange(option.value),
					})),
				}}
				className='border border-gray-300 rounded px-2 w-[100px] cursor-pointer'
			>
				<div className='flex items-center gap-1 justify-between'>
					<span className='text-xs truncate'>{HEADING_OPTIONS.find(option => option.value === selectedHeadingTag)?.label}</span>
					<ArrowDropDownOutlined className='text-gray-500 hover:opacity-50' />
				</div>
			</Dropdown>
		);
	}

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

					<div className='flex items-center justify-center' onClick={useCallback(() => setIsOpen(prev => !prev), [])}>
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
									onClick={() => handleDropdownItemClick(option.value)}
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
