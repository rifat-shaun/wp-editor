import { Editor } from '@tiptap/react';
import { useState } from 'react';
import SvgIcon from '../../common/SvgIcon';
import { TableSelector } from './TableSelector';
import { Popover } from 'antd';
import { ItemGroup } from '../ItemGroup';
import { Button } from '../../base/Button';
import { Divider } from '../Divider';
import { useToolbar } from '@/contexts/ToolbarContext';
import { TOOLBAR_TYPES_ENUM } from '@/constants/Toolbar';
import { useTiptapEditorState } from '@/hooks/useTiptapEditorState';
import { useTableMethods } from '@/hooks/useTableMethods';
import { ArrowDropDownOutlined } from '@mui/icons-material';

type TTableOptionsProps = {
  editor: Editor;
};

export const TableOptions = ({ editor }: TTableOptionsProps) => {
  const { isTableActive } = useTiptapEditorState(editor);
  const { handleInsertTable, handleInsertRowAbove, handleInsertRowBelow, handleInsertColumnLeft, handleInsertColumnRight, handleDeleteColumn, handleMergeCells, handleSplitCell, handleDeleteTable } = useTableMethods(editor);
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const [withHeaderRow, setWithHeaderRow] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const tableOptionsItemGroup = (
    <ItemGroup>
      <div className='flex items-center space-x-2'>
        <Button
          onClick={handleInsertRowAbove}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Insert Row Above'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-add-row-before' strokeWidth={4} />
            <span className='text-sm min-w-max'>Insert Row Above</span>
          </div>
        </Button>

        <Button
          onClick={handleInsertRowBelow}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Insert Row Below'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-add-row-after' strokeWidth={4} />
            <span className='text-sm min-w-max'>Insert Row Below</span>
          </div>
        </Button>

        {/* <ToolbarButtonItem
					tooltip='Delete Row'
					onClick={() => deleteTableRowsWithIdUpdate(editor)}
					disabled={!isTableActive}
					active={false}
					buttonTitle='Delete Row'
					size='small'
					showChildrenInline
				>
					<SvgIcon name='table-delete-row' />
				</ToolbarButtonItem> */}
      </div>

      <div className='flex items-center space-x-2'>
        <Button
          onClick={handleInsertColumnLeft}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Insert Column Left'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-add-column-before' strokeWidth={4} />
            <span className='text-sm min-w-max'>Insert Column Left</span>
          </div>
        </Button>

        <Button
          onClick={handleInsertColumnRight}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Insert Column Right'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-add-column-after' strokeWidth={4} />
            <span className='text-sm min-w-max'>Insert Column Right</span>
          </div>
        </Button>

        <Button
          onClick={handleDeleteColumn}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Delete Column'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-delete-column' strokeWidth={2} />
            <span className='text-sm min-w-max'>Delete Column</span>
          </div>
        </Button>
      </div>
    </ItemGroup>
  );

  return (
    <>
      <Popover
        content={<TableSelector onSelect={(rows, cols) => handleInsertTable(rows, cols, withHeaderRow)} withHeaderRow={withHeaderRow} onHeaderRowChange={(checked: boolean) => setWithHeaderRow(checked)} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        arrow={false}
        style={{ padding: '0px' }}
      >
        <Button
          onClick={() => setOpen(true)}
          active={false}
          size='large'
          title='Insert Table'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table' size={isClassicToolbar ? '18px' : '32px'} strokeWidth={4} />
            <ArrowDropDownOutlined sx={{ fontSize: isClassicToolbar ? '18px' : '22px', color: 'inherit' }} />
          </div>
        </Button>
      </Popover>

      <Divider />

      {tableOptionsItemGroup}

      <Divider />

      <ItemGroup>
        <Button
          onClick={handleMergeCells}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Merge Cells'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-merge-cell' strokeWidth={4} />
            <span className='text-sm min-w-max'>Merge Cells</span>
          </div>
        </Button>

        <Button
          onClick={handleSplitCell}
          disabled={!isTableActive}
          active={false}
          size='small'
          title='Split Cell'
        >
          <div className='flex items-center flex-row gap-1'>
            <SvgIcon name='table-split-cell' strokeWidth={4} />
            <span className='text-sm min-w-max'>Split Cell</span>
          </div>
        </Button>
      </ItemGroup>

      <Divider />

      <ItemGroup>
        <Button
          onClick={handleDeleteTable}
          disabled={!isTableActive}
          active={false}
          size={isClassicToolbar ? 'small' : 'medium'}
          title='Delete Table'
        >
          <div className={`flex items-center ${isClassicToolbar ? 'flex-row gap-1' : 'flex-col gap-0.5'}`}>
            <SvgIcon name='table-delete' size='20px' strokeWidth={4} />
            <span className='text-sm min-w-max'>Delete Table</span>
          </div>
        </Button>
      </ItemGroup>
    </>
  );
};