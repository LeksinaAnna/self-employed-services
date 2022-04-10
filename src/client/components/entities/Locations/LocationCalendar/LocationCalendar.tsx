import React, { useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { EmptyLine } from './Lines/EmptyLine';
import { ActiveLine } from './Lines/ActiveLine';
import { CreateRental } from './CreateRental/CreateRental';
import { InfoRental } from './InfoRental/InfoRental';

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
    const [selectedRental, setRental] = useState<LargeRental>();
    const [isRentalInfo, setRentalInfo] = useState(false);

    const lineWidth = (Number(endTime.split(':')[0]) - Number(startTime.split(':')[0])) * 60;

    const openCreateModal = (positionProp: number, time: string) => {
        setSelectedTime(time);
        setPosition(positionProp);
    };

    const closeModal = () => {
        setRental(null);
        setPosition(null);
        setSelectedTime(null);
        setRentalInfo(false);
    };

    const openRentalInfo = (rental: LargeRental, positionProp: number) => {
        setRental(rental);
        setPosition(positionProp);
        setRentalInfo(true);
    };

    return (
        <LineWrapper widthProp={lineWidth}>
            <EmptyLine openModal={openCreateModal} times={times} />
            <ActiveLine openedModal={isRentalInfo} rentals={room?.rentals} openModal={openRentalInfo} />
            {selectedTime && (
                <CreateRental
                    time={selectedTime}
                    position={position}
                    currentRoomId={room.roomId}
                    accept={service.createRental}
                    close={closeModal}
                />
            )}
            {selectedRental && <InfoRental rental={selectedRental} position={position} close={closeModal} />}
        </LineWrapper>
    );
});
