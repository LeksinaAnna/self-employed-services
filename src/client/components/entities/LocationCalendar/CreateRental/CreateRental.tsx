import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Button, Gapped } from '@skbkontur/react-ui';
import { ValidationContainer } from '@skbkontur/react-ui-validations';
import styled from '@emotion/styled';
import { TimePicker } from '../../../ui/Date/TimePicker';
import { Typography } from '../../../ui/Text/Typography';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { CalendarModal, CalendarModalBody, CalendarModalFooter, CalendarModalHead } from '../CalendarModal';
import { Nullable } from '../../../../../common/interfaces/common';
import { isRequiredField, validateTime } from '../../../../client-tools/validations/validators';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { SearchSpecialistBlock } from './SearchSpecialistBlock';

interface Props {
    time: string;
    currentUserId?: UserId;
    accept: (startTime: string, finishTime: string, specialistId: UserId, roomId: RoomId) => Promise<void>;
    currentRoomId: RoomId;
    close: () => void;
    position: number;
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;

    input {
        text-align: center;
        font-size: 18px;
    }
`;

export const CreateRental: React.FC<Props> = ({ time, close, position, accept, currentRoomId, currentUserId }) => {
    const [startTime, setStartTime] = useState<string>();
    const [finishTime, setFinishTime] = useState<string>();
    const [isError, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [selectedSpec, setSelectedSpec] = useState<Specialist>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [container, refContainer] = useState<Nullable<ValidationContainer>>(null);

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

    const onSubmit = async () => {
        setLoading(true);
        const isValidate = await container.validate();
        if (isValidate) {
            try {
                await accept(startTime, finishTime, currentUserId || selectedSpec.profileId, currentRoomId)
                close();
            } catch (e) {
                setError(true);
                setErrorMessage(e.message);
                setLoading(false);
                return;
            }
        }

        if (!isValidate) {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'absolute', left: position, zIndex: 2, bottom: 38 }}>
            <CalendarModal close={close}>
                <CalendarModalHead>
                    <Typography color={'#fff'} fontSize={'18px'}>
                        ???????????????? ????????????
                    </Typography>
                </CalendarModalHead>
                <CalendarModalBody>
                    <ValidationContainer ref={refContainer}>
                        <InputWrapper>
                            <TimePicker
                                validation={() => validateTime(startTime, finishTime)}
                                value={startTime}
                                onValueChange={setStartTime}
                                width={100}
                                styles={{ height: 40 }}
                            />
                            <span style={{ color: '#fff', margin: '0 5px' }}>&mdash;</span>
                            <TimePicker
                                value={finishTime}
                                onValueChange={setFinishTime}
                                width={100}
                                styles={{ height: 40 }}
                            />
                        </InputWrapper>
                        {!currentUserId && (
                            <div style={{ marginTop: 10 }}>
                                <SearchSpecialistBlock
                                    validation={() => isRequiredField(selectedSpec)}
                                    selectedItem={selectedSpec}
                                    setSelectedItem={setSelectedSpec}
                                />
                            </div>
                        )}
                    </ValidationContainer>
                </CalendarModalBody>
                {isError && <Alert severity={'error'}>{errorMessage}</Alert>}
                <CalendarModalFooter>
                    <Gapped gap={10}>
                        <Button loading={loading} use={'success'} onClick={onSubmit}>
                            ??????????????????
                        </Button>
                        <Button onClick={close}>????????????????</Button>
                    </Gapped>
                </CalendarModalFooter>
            </CalendarModal>
        </div>
    );
};
