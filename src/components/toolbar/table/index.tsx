import { Editor } from '@tiptap/react';
import { useState } from 'react';



// import { deleteTableRowsWithIdUpdate } from '../../utilities';
// import { ToolbarDropdownItem } from './ToolbarDropdownItem';
import SvgIcon from '../../common/SvgIcon';
import { TableSelector } from './TableSelector';
import { Popover } from 'antd';
import { ItemGroup } from '../ItemGroup';
import { ToolbarButtonItem } from '../ToolbarButtonItem';
import { Divider } from '../Divider';
import { useToolbar } from '@/contexts/ToolbarContext';
import { TOOLBAR_TYPES_ENUM } from '@/constants/Toolbar';

type TTableOptionsProps = {
  editor: Editor;
};

export const TableOptions = ({ editor }: TTableOptionsProps) => {
  const { currentToolbar } = useToolbar();
  const isClassicToolbar = currentToolbar === TOOLBAR_TYPES_ENUM.CLASSIC;

  const [withHeaderRow, setWithHeaderRow] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };


  const insertTable = (rows: number, cols: number) => {
    editor.commands.insertTable({ rows, cols, withHeaderRow });
    setOpen(false);
  };

  const tableOptionsItemGroup = (
    <ItemGroup>
      <div className='flex items-center space-x-2'>
        <ToolbarButtonItem
          tooltip='Insert Row Above'
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Insert Row Above'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-add-row-before' />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip='Insert Row Below'
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Insert Row Below'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-add-row-after' />
        </ToolbarButtonItem>

        {/* <ToolbarButtonItem
					tooltip='Delete Row'
					onClick={() => deleteTableRowsWithIdUpdate(editor)}
					disabled={!editor.isActive('table')}
					active={false}
					buttonTitle='Delete Row'
					size='small'
					showChildrenInline
				>
					<SvgIcon name='table-delete-row' />
				</ToolbarButtonItem> */}
      </div>

      <div className='flex items-center space-x-2'>
        <ToolbarButtonItem
          tooltip='Insert Column Left'
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Insert Column Left'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-add-column-before' />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip='Insert Column Right'
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Insert Column Right'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-add-column-after' />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip='Delete Column'
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Delete Column'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-delete-column' />
        </ToolbarButtonItem>
      </div>
    </ItemGroup>
  );

  return (
    <>
      <Popover
        content={<TableSelector onSelect={insertTable} withHeaderRow={withHeaderRow} onHeaderRowChange={(checked: boolean) => setWithHeaderRow(checked)} />}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        arrow={false}
        style={{ padding: '0px' }}
      >
        <SvgIcon name='table' size={isClassicToolbar ? '20px' : '40px'} />
      </Popover>

      <Divider />

      {tableOptionsItemGroup}

      <Divider />

      <ItemGroup>
        <ToolbarButtonItem
          tooltip='Merge Cells'
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Merge Cells'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-merge-cell' />
        </ToolbarButtonItem>

        <ToolbarButtonItem
          tooltip='Split Cell'
          onClick={() => editor.chain().focus().splitCell().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Split Cell'
          size='small'
          showChildrenInline
        >
          <SvgIcon name='table-split-cell' />
        </ToolbarButtonItem>
      </ItemGroup>

      <Divider />

      <ItemGroup>
        <ToolbarButtonItem
          tooltip='Delete Table'
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.isActive('table')}
          active={false}
          buttonTitle='Delete Table'
          size={isClassicToolbar ? 'small' : 'medium'}
          showChildrenInline={isClassicToolbar}
        >
          <SvgIcon name='table-delete' size='20px' />
        </ToolbarButtonItem>
      </ItemGroup>
    </>
  );
};