import React, { useState } from 'react';
import moment from 'moment';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';
import { Button, Center } from '@skbkontur/react-ui';
import { LargeRental, RentalId } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { CalendarModal, CalendarModalBody, CalendarModalFooter, CalendarModalHead } from '../CalendarModal';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';
import { LargeUser } from '../../../../../server/modules/domains/users/entities/user.entity';
import { UserProfile } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { SpecialistInfo } from './SpecialistInfo';

interface Props {
    rental: LargeRental;
    close: () => void;
    onDelete: (id: RentalId) => void;
    position: number;
    specialist?: LargeUser;
}

const TimesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${secondaryText};
    padding-bottom: 5px;

    div:last-child {
        margin-left: 3px;
    }
`;

export const InfoRental: React.FC<Props> = ({ rental, close, position, onDelete, specialist }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [userInfo] = useState<UserProfile>(specialist?.profile || rental?.profile);

    const onSubmitDelete = async () => {
        setLoading(true);
        try {
            await onDelete(rental.rentalId);
        } catch (e) {
            setError(e.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        close();
    };

    return (
        <div style={{ position: 'absolute', left: position, zIndex: 2, bottom: 38 }}>
            <CalendarModal close={close} background={'#c5c5c5'}>
                <CalendarModalHead>
                    <Typography color={'#fff'} fontSize={'20px'}>
                        Инфо об аренде
                    </Typography>
                </CalendarModalHead>
                <CalendarModalBody>
                    <TimesWrapper>
                        <Typography color={secondaryText} fontSize={'16px'}>
                            {moment(rental.startDate).format('DD.MM.YYYY')}
                        </Typography>
                        <Typography color={secondaryText} fontSize={'12px'}>
                            {moment(rental.startDate).format('HH:mm')} - {moment(rental.finishDate).format('HH:mm')}
                        </Typography>
                    </TimesWrapper>

                    {/* Если не мастер (админ) или id мастера совпадает с id мастера из аренды, то покажем полную инфу об аренде */}
                    {(!specialist || userInfo?.profileId === rental?.specialistId) && (
                        <SpecialistInfo userInfo={userInfo} />
                    )}

                    {/* Если мастер, но id мастера и id мастера из аренды не совпадают, то показываем что аренда не его */}
                    {specialist && userInfo?.profileId !== rental?.specialistId && (
                        <Center>
                            <Typography color={secondaryText} fontSize="18px">
                                Это не ваша аренда.
                            </Typography>
                        </Center>
                    )}
                </CalendarModalBody>
                {error && <Alert severity="error">{error}</Alert>}
                <CalendarModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={close}>Закрыть</Button>
                        {(userInfo?.profileId === rental?.specialistId || !specialist) && (
                            <Button use="danger" loading={loading} onClick={onSubmitDelete}>
                                Удалить
                            </Button>
                        )}
                    </div>
                </CalendarModalFooter>
            </CalendarModal>
        </div>
    );
};
