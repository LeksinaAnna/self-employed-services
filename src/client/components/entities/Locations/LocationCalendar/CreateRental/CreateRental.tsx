import React, { useEffect, useState } from 'react';
import { Button, Gapped } from '@skbkontur/react-ui';
import styled from '@emotion/styled';
import { TimePicker } from '../../../../ui/Date/TimePicker';
import { Typography } from '../../../../ui/Text/Typography';
import { LargeUser } from '../../../../../../server/modules/domains/users/entities/user.entity';
import { CalendarModal, CalendarModalBody, CalendarModalFooter, CalendarModalHead } from '../CalendarModal';
import { SearchSpecialistBlock } from './SearchSpecialistBlock';

interface Props {
    time: string;
    accept: () => void;
    close: () => void;
    position: number;
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;

    input {
        text-align: center;
        color: #fff;
        font-weight: 700;
        font-size: 18px;
    }
`;

export const CreateRental: React.FC<Props> = ({ time, close, position }) => {
    const [startTime, setStartTime] = useState<string>();
    const [finishTime, setFinishTime] = useState<string>();
    const [selectedSpec, setSelectedSpec] = useState<LargeUser>();



    useEffect(() => {
        let finishHours = time?.split(':')[0];
        if (Number(finishHours) + 1 < 10) {
            finishHours = `0${Number(finishHours) + 1}`;
        } else {
            finishHours = `${Number(finishHours) + 1}`;
        }

        setFinishTime(`${finishHours}:00`);
        setStartTime(time);
    }, []);

    return (
        <div style={{ position: 'absolute', left: position, zIndex: 2, bottom: 38 }}>
            <CalendarModal close={close}>
                <CalendarModalHead>
                    <Typography color={'#fff'} fontSize={'18px'}>
                        Создание аренды
                    </Typography>
                </CalendarModalHead>
                <CalendarModalBody>
                    <InputWrapper>
                        <TimePicker
                            value={startTime}
                            onValueChange={setStartTime}
                            width={100}
                            styles={{ backgroundColor: '#c5c5c5', height: 40 }}
                        />
                        <span style={{ color: '#fff', margin: '0 5px' }}>&mdash;</span>
                        <TimePicker
                            value={finishTime}
                            onValueChange={setFinishTime}
                            width={100}
                            styles={{ backgroundColor: '#c5c5c5', height: 40 }}
                        />
                    </InputWrapper>
                    <div style={{ marginTop: 10 }}>
                        <SearchSpecialistBlock selectedItem={selectedSpec} setSelectedItem={setSelectedSpec} />
                    </div>
                </CalendarModalBody>
                <CalendarModalFooter>
                    <Gapped gap={10}>
                        <Button use={'success'} >Сохранить</Button>
                        <Button onClick={close}>Отменить</Button>
                    </Gapped>
                </CalendarModalFooter>
            </CalendarModal>
        </div>
    );
};
