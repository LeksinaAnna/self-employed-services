import React from 'react';
import styled from '@emotion/styled';
import { Gapped, Hint } from '@skbkontur/react-ui';
import { hoveredColor, whiteHoveredColor } from '../../../../client-tools/styles/color';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';

interface Props {
    room: LocationReport;
    isActive?: boolean;
    onHoverItem: (value: string) => void;
    reportKoef: number;
}

const ItemWrapper = styled.div<{ heightProp: number | string; isActive?: boolean }>(({ heightProp, isActive }) => ({
    width: 60,
    height: heightProp,
    minHeight: 2,
    background: isActive ? hoveredColor : whiteHoveredColor,
}));

export const ChartItem: React.FC<Props> = ({ room, isActive, onHoverItem, reportKoef }) => (
    <Hint text={<HintMessage room={room} />} pos="bottom">
        <ItemWrapper
            heightProp={room.profit / 10 / reportKoef}
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
