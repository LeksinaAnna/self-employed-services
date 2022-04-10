import React from 'react';
import moment from 'moment';
import { Button, Gapped } from '@skbkontur/react-ui';
import { LargeRental } from '../../../../../../server/modules/domains/rentals/entities/rental.entity';
import { CalendarModal, CalendarModalBody, CalendarModalFooter, CalendarModalHead } from '../CalendarModal';
import { FormLine } from '../../../../ui/FormLine/FormLine';

interface Props {
    rental: LargeRental;
    close: () => void;
    position: number;
}

export const InfoRental: React.FC<Props> = ({ rental, close, position }) => {
    return (
        <div style={{ position: 'absolute', left: position, zIndex: 2, bottom: 38 }}>
            <CalendarModal close={close}>
                <CalendarModalHead>Аренда</CalendarModalHead>
                <CalendarModalBody>
                    <FormLine caption='Арендатор'>
                        <div>{rental?.profile?.fullName}</div>
                        <div>{rental?.profile?.contacts?.phone}</div>
                    </FormLine>
                    <FormLine caption='Дата начала'>
                        {moment(rental.startDate).format('DD.MM.YYYY HH:mm')}
                    </FormLine>
                    <FormLine caption='Дата окончания'>
                        {moment(rental.startDate).format('DD.MM.YYYY HH:mm')}
                    </FormLine>
                </CalendarModalBody>
                <CalendarModalFooter>
                    <Gapped gap={10}>
                        <Button>Закрыть</Button>
                        <Button use='danger'>Удалить</Button>
                    </Gapped>
                </CalendarModalFooter>
            </CalendarModal>
        </div>
    );
};
