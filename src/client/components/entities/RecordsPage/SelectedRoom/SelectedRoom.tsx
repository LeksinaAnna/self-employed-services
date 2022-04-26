import React from 'react';
import { Button, Center, DatePicker, Gapped } from '@skbkontur/react-ui';
import { LocationCalendar } from '../../LocationCalendar/LocationCalendar';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { Typography } from '../../../ui/Text/Typography';
import { notActiveText } from '../../../../client-tools/styles/color';

interface Props {
    room: Room & WithRentals;
    updatePage: () => Promise<void>;
    changeDate: (value: string) => void;
    openChangeRoomModal: () => void;
    currentDate: string;
    isLoading: boolean;
}

export const SelectedRoom: React.FC<Props> = ({
    room,
    updatePage,
    changeDate,
    currentDate,
    openChangeRoomModal,
    isLoading
}) => (
    <div style={{ margin: '18px 0' }}>
        {room && (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DatePicker width={100} onValueChange={changeDate} value={currentDate} />
                    <Button onClick={openChangeRoomModal} use='link'>
                        Поменять помещение
                    </Button>
                </div>
                <LocationCalendar room={room} updatePage={updatePage} currentDate={currentDate} />
            </>
        )}
        {!room && !isLoading && (
            <Center style={{ marginTop: 50 }}>
                <Gapped gap={10} vertical>
                    <Typography fontSize={'24px'} color={notActiveText}>
                        У вас не выбрана локация
                    </Typography>
                    <Center>
                        <Button use="link" size="medium" onClick={openChangeRoomModal}>
                            Выбрать локацию
                        </Button>
                    </Center>
                </Gapped>
            </Center>
        )}
    </div>
);
