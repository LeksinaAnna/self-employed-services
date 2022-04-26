import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { LargeRoom, RoomId } from '../../../../../../server/modules/domains/rooms/entities/room.entity';
import { greenText, hoveredColor, orangeText, secondaryText } from '../../../../../client-tools/styles/color';
import { Typography } from '../../../../ui/Text/Typography';
import { professionTypeDict } from '../../../../../../server/modules/domains/users/entities/user-profile.entity';

interface Props {
    item: LargeRoom;
    changeRoom: (roomId: RoomId) => void;
}

export const RoomItem: React.FC<Props> = ({ item, changeRoom }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <TableRow
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => changeRoom(item.roomId)}
            style={{ background: isHover && hoveredColor, cursor: 'pointer' }}
        >
            <TableCell style={{ padding: 5 }}>
                <Typography fontSize="18px" color={secondaryText}>
                    {item.title}
                </Typography>
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                <Typography fontSize="18px" color={greenText}>
                    {item.price} руб/ч
                </Typography>
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                <Typography fontSize="18px" color={orangeText}>
                    {professionTypeDict[item.type]}
                </Typography>
            </TableCell>
            <TableCell style={{ padding: 5 }}>
                <Typography fontSize="14px" color={secondaryText}>
                    {item.description}
                </Typography>
            </TableCell>
        </TableRow>
    );
};
