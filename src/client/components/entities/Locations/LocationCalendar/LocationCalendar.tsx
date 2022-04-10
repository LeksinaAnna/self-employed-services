import React, { useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { EmptyLine } from './Lines/Empty/EmptyLine';
import { ActiveLine } from './Lines/Active/ActiveLine';
import { CreateRental } from './CreateRental/CreateRental';

interface Props {
    room: LargeRoom;
}

const LineWrapper = styled.div<{ widthProp: number }>(({ widthProp }) => ({
    width: widthProp,
    height: 35,
    position: 'relative',
}));

export const LocationCalendar: React.FC<Props> = observer(({ room }) => {
    const { locationsStore } = useStores();
    const { times, endTime, startTime, service } = locationsStore;

    const [position, setPosition] = useState<number>();
    const [selectedTime, setSelectedTime] = useState<string>();
    const [isModal, setModal] = useState<boolean>();

    const lineWidth = (Number(endTime.split(':')[0]) - Number(startTime.split(':')[0])) * 60;

    const openCreateModal = (positionProp: number, time: string) => {
        setSelectedTime(time);
        setPosition(positionProp);
        setModal(true);
    };

    const closeCreateModal = () => {
        setModal(false);
        setPosition(null);
        setSelectedTime('');
    };

    return (
        <LineWrapper widthProp={lineWidth}>
            <EmptyLine openModal={openCreateModal} times={times} />
            <ActiveLine rentals={room?.rentals} />
            {isModal && (
                <CreateRental
                    time={selectedTime}
                    position={position}
                    currentRoomId={room.roomId}
                    accept={service.createRental}
                    close={closeCreateModal}
                />
            )}
        </LineWrapper>
    );
});
