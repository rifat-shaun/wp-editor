import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from "../../base/Button";
import SvgIcon from "../../common/SvgIcon";
import { DROPDOWN_OFFSET, HEADING_OPTIONS, HEADING_STYLES } from '@/constants/Heading';
import { useTiptapEditorState } from '@/hooks/useTiptapEditorState';
import { useHeadingStyleMethods } from '@/hooks/useHeadingStyleMethods';
import { useToolbar } from '@/contexts/ToolbarContext';
import { TOOLBAR_TYPES_ENUM } from '@/constants/Toolbar';
import { Dropdown } from 'antd';
import { ArrowDropDownOutlined } from '@mui/icons-material';

export const HeadingOptions = () => {
	const { currentToolbar } = useToolbar();

	const { selectionHeadingLevel } = useTiptapEditorState();
	const { handleHeadingChange } = useHeadingStyleMethods();

	const headingsContainerRef = useRef<HTMLDivElement>(null);
	const expandableContainerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const [shouldUseContentWidth, setShouldUseContentWidth] = useState(false);

	const handleDropdownItemClick = useCallback((optionValue: string) => {
		handleHeadingChange(optionValue);
		setIsOpen(false);
	}, [handleHeadingChange]);

	const selectedHeadingTag = selectionHeadingLevel === 'paragraph' ? selectionHeadingLevel : `h${selectionHeadingLevel}`;

	const updatePosition = useCallback(() => {
		if (isOpen && headingsContainerRef.current) {
			const rect = headingsContainerRef.current.getBoundingClientRect();
			const windowWidth = window.innerWidth;

			if (rect.right + (Math.min(rect.left, 0) - 100) >= rect.width) {
				setShouldUseContentWidth(false);
				setPosition({
					top: rect.bottom + window.scrollY - DROPDOWN_OFFSET,
					left: rect.left + window.scrollX,
				});

				return;
			}

			// Check if there's enough space on the left
			const hasEnoughSpaceOnLeft = rect.width <= windowWidth - 20; // 20px buffer

			if (hasEnoughSpaceOnLeft) {
				setPosition({
					top: rect.bottom + window.scrollY - DROPDOWN_OFFSET,
					left: (windowWidth - rect.width) / 2,
				});
				setShouldUseContentWidth(true);
			} else {
				// Position to the right if not enough space on left
				setPosition({
					top: rect.bottom + window.scrollY - DROPDOWN_OFFSET,
					left: Math.max(windowWidth - rect.width - 20, 0) + window.scrollX, // Ensure it stays within viewport
				});
				setShouldUseContentWidth(true);
			}
		}
	}, [isOpen]);

	useEffect(() => {
		updatePosition();
	}, [updatePosition]);

	useEffect(() => {
		if (!isOpen) return;

		const handleResize = () => {
			updatePosition();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isOpen, updatePosition]);

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

	const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

	if (currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC) {
		return (
			<Dropdown
				menu={{
					items: HEADING_OPTIONS?.map((option) => ({
						key: option.value,
						label: headingRenderer(option),
						onClick: () => handleHeadingChange(option.value),
					})),
				}}
				className='border border-gray-300 rounded px-2 w-[100px] h-6 cursor-pointer'
			>
				<div className='flex items-center gap-1 justify-between'>
					<span className='text-sm truncate'>{HEADING_OPTIONS.find(option => option.value === selectedHeadingTag)?.label}</span>
					<ArrowDropDownOutlined className='text-gray-500 hover:opacity-50' />
				</div>
			</Dropdown>
		);
	}

	return (
		<div className={`flex items-center relative h-12 min-w-fit bg-gray-100`}>
			<div ref={headingsContainerRef} className={`flex flex-col items-center bg-gray-100 rounded-sm p-2 ${isOpen ? 'rounded-b-none' : ''}`}>
				<div className='flex items-center gap-2'>
					{HEADING_OPTIONS?.slice(0, 4)?.map((option) => (
						<Button
							key={option.value}
							title={option.label}
							onClick={() => handleHeadingChange(option.value)}
							active={selectionHeadingLevel === option.value}
							className={`rounded-md h-10 w-fit bg-white border border-neutral-200 hover:bg-white hover:border-1 hover:border-primary-300 ${selectedHeadingTag === option.value ? '!border-1 !border-primary-400' : ''}`}
						>
							<div className='w-24 h-full flex flex-col items-center justify-between'>
								{headingRenderer(option)}
								<div className='text-[8px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
							</div>
						</Button>
					))}

					<div className='flex items-center justify-center' onClick={toggleOpen}>
						<SvgIcon name='arrow-down' className={`cursor-pointer ${isOpen ? 'rotate-180' : ''}`} strokeWidth={4} />
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
								<Button
									key={option.value}
									title={option.label}
									onClick={() => handleDropdownItemClick(option.value)}
									active={selectionHeadingLevel === option.value}
									className={`rounded-md h-10 w-fit bg-white border border-neutral-200 hover:bg-white hover:border-1 hover:border-primary-300 ${selectedHeadingTag === option.value ? '!border-1 !border-primary-400' : ''}`}
								>
									<div className='w-24 h-full flex flex-col items-center justify-between'>
										{headingRenderer(option)}
										<div className='text-[8px] text-gray-500 font-bold'>{option.value.toUpperCase()}</div>
									</div>
								</Button>
							))}
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
};
