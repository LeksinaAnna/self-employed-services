import React from 'react';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';

export const TableInfo: React.FC = () => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell width="55%">
                        <Typography color={notActiveText} fontSize="14px">
                            Клиент
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography color={notActiveText} fontSize="14px">
                            Стоимость услуг
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography color={notActiveText} fontSize="14px">
                            Аренда
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography color={notActiveText} fontSize="14px">
                            Прибыль
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    );
};