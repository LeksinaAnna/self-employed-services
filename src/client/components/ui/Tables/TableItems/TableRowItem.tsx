import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { Gapped } from '@skbkontur/react-ui';
import { PersonOutline } from '@mui/icons-material';
import { hoveredColor, notActiveText } from '../../../../client-tools/styles/color';
import { Typography } from '../../Text/Typography';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { TableItem } from './TableWithItems';

interface Props {
    item: TableItem;
    onSettings: (item: TableItem) => void;
}

export const TableRowItem: React.FC<Props> = ({ item, onSettings }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <TableRow
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ background: isHover && hoveredColor, cursor: 'pointer' }}
            onClick={() => onSettings(item)}
        >
            <TableCell style={{ padding: 5 }}>
                <Gapped gap={2} verticalAlign="middle">
                    <PersonOutline sx={{ color: notActiveText }} fontSize={'large'} />
                    <Typography fontSize={'18px'}>{item.name}</Typography>
                </Gapped>
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                {item.type && <Typography fontSize={'16px'}>{professionTypeDict[item.type]}</Typography>}
            </TableCell>
            <TableCell align="right" style={{ padding: 5 }}>
                <Typography fontSize={'14px'}>{item.comment}</Typography>
            </TableCell>
        </TableRow>
    );
};
