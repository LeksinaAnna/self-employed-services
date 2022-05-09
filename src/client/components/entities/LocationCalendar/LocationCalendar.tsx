import React, { useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Room, RoomId } from '../../../../server/modules/domains/rooms/entities/room.entity';
import { RentalId, WithRentals } from '../../../../server/modules/domains/rentals/entities/rental.entity';
import { UserId } from '../../../../server/modules/domains/users/entities/user.entity';
import { EmptyLine } from './Lines/EmptyLine';
import { ActiveLine } from './Lines/ActiveLine';
import { CreateRental } from './CreateRental/CreateRental';
import { InfoRental } from './InfoRental/InfoRental';
import { CalendarStore } from './stores/calendar.store';
import { CalendarTitle } from './CalendarTitle';

interface Props {
    room: Room & WithRentals;
    updatePage: () => Promise<void>;
    currentDate: string;
    openSettings?: () => void;
}

const LineWrapper = styled.div<{ widthProp: number }>(({ widthProp }) => ({
    width: widthProp,
    height: 35,
    position: 'relative',
}));

export const LocationCalendar: React.FC<Props> = observer(({ room, updatePage, currentDate, openSettings }) => {
    const rootStore = useStores();
    const [calendarStore] = useState<CalendarStore>(() => new CalendarStore(rootStore));
    const {
        lineWidth,
        currentUser,
        openModal,
        times,
        selectedRental,
        selectedTime,
        positionModal,
        service,
        closeModal,
    } = calendarStore;

    const onAccept = async (startTime: string, endTime: string, specialistId: UserId, roomId: RoomId) => {
        await service.createRental(startTime, endTime, specialistId, roomId, currentDate);
        await updatePage();
    };

    const onDelete = async (rentalId: RentalId) => {
        await service.deleteRental(rentalId);
        await updatePage();
    };

    return (
        <div style={{ margin: '10px 0' }}>
            <CalendarTitle openSettings={openSettings} title={room?.title} price={room?.price} />
            <LineWrapper widthProp={lineWidth}>
                <EmptyLine openModal={openModal} times={times} />
                <ActiveLine openedModal={!!selectedRental} rentals={room?.rentals} openModal={openModal} />
                {selectedTime && (
                    <CreateRental
                        time={selectedTime}
                        position={positionModal}
                        currentRoomId={room.roomId}
                        specialist={currentUser}
                        accept={onAccept}
                        close={closeModal}
                    />
                )}
                {selectedRental && (
                    <InfoRental
                        specialist={currentUser}
                        onDelete={onDelete}
                        rental={selectedRental}
                        position={positionModal}
                        close={closeModal}
                    />
                )}
            </LineWrapper>
        </div>
    );
});
