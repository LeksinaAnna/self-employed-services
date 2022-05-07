import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText } from '../../../../client-tools/styles/color';

export const TableInfoHead: React.FC = () => (
    <TableRow>
        <TableCell width="55%" style={{ padding: 5 }}>
            <Typography color={notActiveText} fontSize="14px">
                Клиент
            </Typography>
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            <Typography color={notActiveText} fontSize="14px">
                Стоимость услуг
            </Typography>
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            <Typography color={notActiveText} fontSize="14px">
                Кол-во записей
            </Typography>
        </TableCell>
        <TableCell style={{ padding: 5 }}>
            <Typography color={notActiveText} fontSize="14px">
                Прибыль
            </Typography>
        </TableCell>
    </TableRow>
);
