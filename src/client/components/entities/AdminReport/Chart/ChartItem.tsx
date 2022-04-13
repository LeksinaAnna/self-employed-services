import React from 'react';
import styled from '@emotion/styled';
import { Gapped, Hint } from '@skbkontur/react-ui';
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

export const ChartItem: React.FC<Props> = ({ room, isActive, onHoverItem }) => (
    <Hint text={<HintMessage room={room} />} pos="bottom">
        <ItemWrapper
            heightProp={room.profit / 15}
            isActive={isActive}
            onMouseEnter={() => onHoverItem(room.roomId)}
            onMouseLeave={() => onHoverItem(null)}
        />
    </Hint>
);

const HintMessage = ({ room }) => (
    <Gapped vertical gap={5}>
        <div>
            <span style={{ textAlign: 'left', fontWeight: 700 }}>Локация: </span>
            <span>{room.title}</span>
        </div>
        <div>
            <span style={{ textAlign: 'left', fontWeight: 700 }}>Кол-во аренд: </span>
            <span>{room.countRental} шт.</span>
        </div>
        <div>
            <span style={{ textAlign: 'left', fontWeight: 700 }}>Прибыль: </span>
            <span>{room.profit} руб.</span>
        </div>
    </Gapped>
);
