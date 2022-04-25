import React, { useState } from 'react';
import moment from 'moment';
import { TableCell, TableRow } from '@mui/material';
import { Hint } from '@skbkontur/react-ui';
import { Delete } from '@mui/icons-material';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { Typography } from '../../../ui/Text/Typography';
import { greenText, hoveredColor, orangeText } from '../../../../client-tools/styles/color';

interface Props {
    item: ServiceItem;
    openSettings: (item: ServiceItem) => void;
    onDelete: (itemId: string) => void;
}

export const ServicesTableItem: React.FC<Props> = ({ item, openSettings, onDelete }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const getTime = (): string => {
        const hours = moment.duration(item.duration).hours();
        const minutes = moment.duration(item.duration).minutes();

        return `${hours > 0 ? hours.toString() + ' ч' : ''} ${minutes > 0 ? minutes.toString() + ' мин' : ''}`;
    };

    return (
        <TableRow
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ background: isHover && hoveredColor, cursor: 'pointer' }}
        >
            <TableCell style={{ padding: '10px 5px' }} onClick={() => openSettings(item)}>
                <Typography fontSize="16px">{item.title}</Typography>
            </TableCell>
            <TableCell style={{ padding: '10px 5px' }} onClick={() => openSettings(item)}>
                <Typography fontSize="16px" color={orangeText}>
                    {getTime()}
                </Typography>
            </TableCell>
            <TableCell style={{ padding: '10px 5px' }} onClick={() => openSettings(item)}>
                <Typography fontSize="16px" color={greenText}>
                    {item.price.toFixed(2)} руб
                </Typography>
            </TableCell>
            <TableCell>
                <Hint text='Удалить'>
                    <div style={{ width: 20 }} onClick={() => onDelete(item.serviceId)}>
                        <Delete fontSize='small' color='error' />
                    </div>
                </Hint>
            </TableCell>
        </TableRow>
    );
};
