import React from 'react';
import styled from '@emotion/styled';
import { RoomWithProfit } from '../../../../../server/modules/domains/rooms/entities/room.entity';

interface Props {
    room: RoomWithProfit;
    isActive?: boolean;
    onHoverItem: (value: string) => void;
}

const ItemWrapper = styled.div<{ heightProp: number | string; isActive?: boolean }>(({ heightProp, isActive }) => ({
    width: 60,
    height: heightProp,
    minHeight: 2,
    background: isActive ? '#ddedf5' : 'aliceblue',
}));

export const ChartItem: React.FC<Props> = ({ room, isActive, onHoverItem }) => {
    const getHeight = () => room.profit / 15;

    return (
        <ItemWrapper
            heightProp={getHeight()}
            isActive={isActive}
            onMouseEnter={() => onHoverItem(room.roomId)}
            onMouseLeave={() => onHoverItem(null)}
        />
    );
};
