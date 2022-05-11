import React from 'react';
import styled from '@emotion/styled';
import { TableCell, TableRow, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Room, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { hoveredColor, secondaryText } from '../../../../client-tools/styles/color';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

const StyledCell = styled(TableCell)`
    padding: 10px;
`;

const StyledRow = styled(TableRow)`
    :hover {
        cursor: pointer;
        background: ${hoveredColor};
    }
`;

interface Props {
    item: Room;
    selectedRoom: RoomId;
    onSelect: (roomId: RoomId) => void;
}

export const LocationItem: React.FC<Props> = ({ item, selectedRoom, onSelect }) => (
    <StyledRow onClick={() => onSelect(item.roomId)}>
        <StyledCell>{item.title}</StyledCell>
        <StyledCell>
            <Typography color={secondaryText}>{professionTypeDict[item.type]}</Typography>
        </StyledCell>
        <StyledCell>{selectedRoom === item.roomId && <DoneOutlineIcon color={'success'} />}</StyledCell>
    </StyledRow>
);
