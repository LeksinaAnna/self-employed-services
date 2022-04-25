import React from 'react';
import { Table, TableHead } from '@mui/material';
import { TableWithItemsHead } from './TableWithItemsHead';
import { TableWithItemsBody } from './TableWithItemsBody';

export interface TableItem {
    id: string;
    name: string;
    comment: string;
    type?: string;
}

interface Props {
    items: TableItem[];
    onSettings: (item: TableItem) => void;
}

export const TableWithItems: React.FC<Props> = ({ items, onSettings }) => (
    <Table>
        <TableHead>
            <TableWithItemsHead />
        </TableHead>
        <TableWithItemsBody items={items} onSettings={onSettings} />
    </Table>
);