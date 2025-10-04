// import { CheckboxComponent } from '@/components/base';
import React, { useEffect, useRef, useState } from 'react';

type TableSelectorProps = {
	onSelect: (rows: number, cols: number) => void;
	withHeaderRow?: boolean;
	onHeaderRowChange?: (checked: boolean) => void;
};

export const TableSelector: React.FC<TableSelectorProps> = ({ onSelect, withHeaderRow = true, onHeaderRowChange }) => {
	const [hoveredCells, setHoveredCells] = useState<{ rows: number; cols: number }>({
		rows: 0,
		cols: 0,
	});
	const [visibleRows, setVisibleRows] = useState(8);
	const [visibleCols, setVisibleCols] = useState(8);
	const gridRef = useRef<HTMLDivElement>(null);
	const lastHoverTimeRef = useRef<number>(0);
	const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const initialRowsSize = 8;
	const initialColsSize = 10;
	const maxSize = 20;
	const shrinkBuffer = 3;
	const resizeThrottle = 80;

	// Clean up any remaining timeouts
	useEffect(() => {
		return () => {
			if (resizeTimeoutRef.current) {
				clearTimeout(resizeTimeoutRef.current);
			}
		};
	}, []);

	const updateGridSize = (newRow: number, newCol: number) => {
		if (resizeTimeoutRef.current) {
			clearTimeout(resizeTimeoutRef.current);
		}

		resizeTimeoutRef.current = setTimeout(() => {
			if (newRow >= visibleRows - 1 && visibleRows < maxSize) {
				setVisibleRows((prev) => Math.min(prev + 1, maxSize));
			}

			if (newCol >= visibleCols - 1 && visibleCols < maxSize) {
				setVisibleCols((prev) => Math.min(prev + 1, maxSize));
			}

			if (newRow < visibleRows - shrinkBuffer && visibleRows > initialRowsSize) {
				setVisibleRows((_prev) => Math.max(newRow + shrinkBuffer, initialRowsSize));
			}

			if (newCol < visibleCols - shrinkBuffer && visibleCols > initialColsSize) {
				setVisibleCols((_prev) => Math.max(newCol + shrinkBuffer, initialColsSize));
			}

			resizeTimeoutRef.current = null;
		}, resizeThrottle);
	};

	const handleCellHover = (row: number, col: number) => {
		const now = Date.now();
		const newRow = row + 1;
		const newCol = col + 1;

		setHoveredCells({ rows: newRow, cols: newCol });

		if (now - lastHoverTimeRef.current < resizeThrottle) {
			return;
		}

		lastHoverTimeRef.current = now;
		updateGridSize(newRow, newCol);
	};

	const handleGridMouseLeave = () => {
		// Reset hoveredCells to 0×0 when the cursor leaves the grid
		setHoveredCells({ rows: 0, cols: 0 });
	};

	const handleCellClick = () => {
		onSelect(hoveredCells.rows, hoveredCells.cols);
		resetGridState();
	};

	const handleHeaderRowChange = (e: any) => {
		if (onHeaderRowChange) {
			onHeaderRowChange(e.target.checked);
		}
	};

	const resetGridState = () => {
		if (resizeTimeoutRef.current) {
			clearTimeout(resizeTimeoutRef.current);
			resizeTimeoutRef.current = null;
		}
		setVisibleRows(initialRowsSize);
		setVisibleCols(initialColsSize);
		setHoveredCells({ rows: 0, cols: 0 });
		lastHoverTimeRef.current = 0;
	};

	return (
		<div className='relative' id='editor-dropdown-content'>
			<div
				ref={gridRef}
				className='grid gap-[2px]'
				style={{
					gridTemplateColumns: `repeat(${visibleCols}, 1fr)`,
					overflowY: visibleRows > initialRowsSize ? 'auto' : 'visible',
					transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
				}}
				onMouseLeave={handleGridMouseLeave}
			>
				{Array.from({ length: visibleRows }).map((_row, rowIndex) => (
					<React.Fragment key={rowIndex}>
						{Array.from({ length: visibleCols }).map((_col, colIndex) => (
							<div
								key={`${rowIndex}-${colIndex}`}
								className={`w-4 h-4 border cursor-pointer transition-colors duration-50 ${rowIndex < hoveredCells.rows && colIndex < hoveredCells.cols ? 'bg-primary-100 border-primary-300' : 'bg-gray-50 border-gray-300'
									}`}
								onMouseEnter={() => handleCellHover(rowIndex, colIndex)}
								onClick={handleCellClick}
							/>
						))}
					</React.Fragment>
				))}
			</div>

			<div className='flex items-center justify-between text-sm text-gray-700 font-medium mt-1'>
				<div>
					{hoveredCells.rows}×{hoveredCells.cols}
				</div>

				<div>Click to insert table</div>
			</div>

			{/* <div className='my-2 mb-1'>
                <CheckboxComponent id='table-header-row' label='Include header row' isChecked={withHeaderRow} onChange={handleHeaderRowChange} />
            </div> */}
		</div>
	);
};
