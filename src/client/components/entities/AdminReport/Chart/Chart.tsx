import React from 'react';
import styled from '@emotion/styled';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { ChartItem } from './ChartItem';

interface Props {
    rooms: LocationReport[];
    hoveredRoom: RoomId;
    onHoverItem: (value: string) => void;
    reportKoef: number;
}

const ChartWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 15px 0;
`;

export const Chart: React.FC<Props> = ({ rooms, hoveredRoom, onHoverItem, reportKoef }) => (
    <ChartWrapper>
        {rooms.map(room => (
            <ChartItem
                key={`chart-${room.roomId}`}
                reportKoef={reportKoef}
                room={room}
                isActive={hoveredRoom === room.roomId}
                onHoverItem={onHoverItem}
            />
        ))}
    </ChartWrapper>
);
