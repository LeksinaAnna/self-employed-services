import React from 'react';
import { TableBody } from '@mui/material';
import { TableItem } from './TableWithItems';
import { TableRowItem } from './TableRowItem';

interface Props {
    items: TableItem[];
    onSettings: (item: TableItem) => void;
}

export const TableWithItemsBody: React.FC<Props> = ({ items, onSettings }) => (
    <TableBody>
        {items &&
            items.map(item => <TableRowItem key={item.id} item={item} onSettings={onSettings} /> )}
    </TableBody>
);
