import React, { useState } from 'react';
import moment from 'moment';
import { Alert } from '@mui/material';
import styled from '@emotion/styled';
import { Button } from '@skbkontur/react-ui';
import { LargeRental, RentalId } from '../../../../../../server/modules/domains/rentals/entities/rental.entity';
import { CalendarModal, CalendarModalBody, CalendarModalFooter, CalendarModalHead } from '../CalendarModal';
import { Typography } from '../../../../ui/Text/Typography';
import { secondaryText } from '../../../../../client-tools/styles/color';

interface Props {
    rental: LargeRental;
    close: () => void;
    onDelete: (id: RentalId) => void;
    position: number;
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

const SpecialistInfoWrapper = styled.div`
    padding: 5px;
    margin-top: 5px;
    background: rgba(220, 219, 219, 0.55);
`;

const InfoItem = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;

    div:last-child {
        margin-left: 10px;
    }
`;

export const InfoRental: React.FC<Props> = ({ rental, close, position, onDelete }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmitDelete = async () => {
        setLoading(true);
        try {
            await onDelete(rental.rentalId);
        } catch (e) {
            setError(e.message);
        }

        setLoading(false);
    }

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
                    <SpecialistInfoWrapper>
                        <InfoItem>
                            <Typography fontSize={'14px'} color={secondaryText}>
                                Арендатор:
                            </Typography>
                            <Typography color={'rgba(238,116,56,0.75)'}>{rental.profile.fullName}</Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography fontSize={'14px'} color={secondaryText}>
                                Телефон:
                            </Typography>
                            <Typography color={'rgba(238,116,56,0.75)'}>
                                {rental.profile.contacts.phone || ' - '}
                            </Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography fontSize={'14px'} color={secondaryText}>
                                Почта:
                            </Typography>
                            <Typography color={'rgba(238,116,56,0.75)'}>
                                {rental.profile.contacts.email || ' - '}
                            </Typography>
                        </InfoItem>
                    </SpecialistInfoWrapper>
                </CalendarModalBody>
                {error && <Alert severity='error'>{error}</Alert>}
                <CalendarModalFooter>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={close}>Закрыть</Button>
                        <Button use="danger" loading={loading} onClick={onSubmitDelete}>Удалить</Button>
                    </div>
                </CalendarModalFooter>
            </CalendarModal>
        </div>
    );
};
