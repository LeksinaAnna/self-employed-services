import React, { useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { EmptyLine } from './Lines/EmptyLine';
import { ActiveLine } from './Lines/ActiveLine';
import { CreateRental } from './CreateRental/CreateRental';
import { InfoRental } from './InfoRental/InfoRental';
import { CalendarStore } from './stores/calendar.store';

interface Props {
    room: LargeRoom;
}

const LineWrapper = styled.div<{ widthProp: number }>(({ widthProp }) => ({
    width: widthProp,
    height: 35,
    position: 'relative',
}));

export const LocationCalendar: React.FC<Props> = observer(({ room }) => {
    const [calendarStore] = useState<CalendarStore>(() => new CalendarStore(useStores()));
    const { lineWidth, openModal, times, selectedRental, selectedTime, positionModal, service, closeModal } =
        calendarStore;

    return (
        <LineWrapper widthProp={lineWidth}>
            <EmptyLine openModal={openModal} times={times} />
            <ActiveLine openedModal={!!selectedRental} rentals={room?.rentals} openModal={openModal} />
            {selectedTime && (
                <CreateRental
                    time={selectedTime}
                    position={positionModal}
                    currentRoomId={room.roomId}
                    accept={service.createRental}
                    close={closeModal}
                />
            )}
            {selectedRental && <InfoRental rental={selectedRental} position={positionModal} close={closeModal} />}
        </LineWrapper>
    );
});
