import React, { useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Room, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RentalId, WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { EmptyLine } from './Lines/EmptyLine';
import { ActiveLine } from './Lines/ActiveLine';
import { CreateRental } from './CreateRental/CreateRental';
import { InfoRental } from './InfoRental/InfoRental';
import { CalendarStore } from './stores/calendar.store';

interface Props {
    room: Room & WithRentals;
    updatePage: () => Promise<void>;
}

const LineWrapper = styled.div<{ widthProp: number }>(({ widthProp }) => ({
    width: widthProp,
    height: 35,
    position: 'relative',
}));

export const LocationCalendar: React.FC<Props> = observer(({ room, updatePage }) => {
    const rootStore = useStores();
    const [calendarStore] = useState<CalendarStore>(() => new CalendarStore(rootStore));
    const { lineWidth, openModal, times, selectedRental, selectedTime, positionModal, service, closeModal } =
        calendarStore;

    const onAccept = async (startTime: string, endTime: string, specialistId: UserId, roomId: RoomId) => {
        await service.createRental(startTime, endTime, specialistId, roomId);
        closeModal();
        await updatePage();
    }

    const onDelete = async (rentalId: RentalId) => {
        await service.deleteRental(rentalId);
        closeModal();
        await updatePage();
    }

    return (
        <LineWrapper widthProp={lineWidth}>
            <EmptyLine openModal={openModal} times={times} />
            <ActiveLine openedModal={!!selectedRental} rentals={room?.rentals} openModal={openModal} />
            {selectedTime && (
                <CreateRental
                    time={selectedTime}
                    position={positionModal}
                    currentRoomId={room.roomId}
                    accept={onAccept}
                    close={closeModal}
                />
            )}
            {selectedRental && <InfoRental onDelete={onDelete} rental={selectedRental} position={positionModal} close={closeModal} />}
        </LineWrapper>
    );
});
