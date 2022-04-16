import React from 'react';
import { Table, TableHead } from '@mui/material';
import { ServicesTableHead } from './ServicesTableHead';
import { ServicesTableBody } from './ServicesTableBody';

export const ServicesTable: React.FC = () => (
    <Table>
        <TableHead>
            <ServicesTableHead />
        </TableHead>
        <ServicesTableBody />
    </Table>
);