import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { EmptyLine } from './Lines/Empty/EmptyLine';
import { ActiveLine } from './Lines/Active/ActiveLine';

interface Props {
    room: LargeRoom;
}

const LineWrapper = styled.div<{widthProp: number}>(({widthProp}) => ({
    width: widthProp,
    height: 35,
    position: 'relative',
}));

export const LocationCalendar: React.FC<Props> = observer(({ room }) => {
    const { locationsStore } = useStores();
    const { times, endTime, startTime } = locationsStore;

    const lineWidth = (Number(endTime.split(':')[0]) - Number(startTime.split(':')[0])) * 60;

    return (
            <LineWrapper widthProp={lineWidth}>
                <EmptyLine times={times} />
                <ActiveLine rentals={room?.rentals} />
            </LineWrapper>
    );
});
