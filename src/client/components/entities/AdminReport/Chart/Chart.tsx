import React from 'react';
import styled from '@emotion/styled';
import { RoomId, RoomWithProfit } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { ChartItem } from './ChartItem';

interface Props {
    rooms: RoomWithProfit[];
    hoveredRoom: RoomId;
    onHoverItem: (value: string) => void;
}

const ChartWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 15px 0;
`;

export const Chart: React.FC<Props> = ({ rooms, hoveredRoom, onHoverItem }) => (
    <ChartWrapper>
        {rooms.map(room => (
            <ChartItem
                key={`chart-${room.roomId}`}
                room={room}
                isActive={hoveredRoom === room.roomId}
                onHoverItem={onHoverItem}
            />
        ))}
    </ChartWrapper>
);
