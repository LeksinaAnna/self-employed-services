import React, { useState } from 'react';
import { Button, DatePicker, Gapped, Toast } from '@skbkontur/react-ui';
import moment from 'moment';
import { Alert } from '@mui/material';
import {
    LargeRecord,
    RecordUpdateProperties,
} from '../../../../../../server/modules/domains/records/entities/record.entity';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../../ui/Modals/Modal';
import { FormLine } from '../../../../ui/FormLine/FormLine';
import { TimePicker } from '../../../../ui/Date/TimePicker';

interface Props {
    record: LargeRecord;
    accept: (properties: RecordUpdateProperties) => void;
    onClose: () => void;
}

export const RecordSettingsModal: React.FC<Props> = ({ record, accept, onClose }) => {
    const [startDate, setStartDate] = useState(moment(record.recordDate).format('DD.MM.YYYY'));
    const [startTime, setStartTime] = useState(moment(record.recordDate).format('HH:mm'));

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>(null);

    const onSubmit = async () => {
        setLoading(true);

        try {
            const recordDate = moment(startDate + ' ' + startTime, 'DD.MM.YYYY HH:mm').format();

            await accept({
                recordId: record.recordId,
                recordDate,
            });
            Toast.push('Готово');
            onClose();
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <ModalHead>Настройки записи</ModalHead>
            <ModalBody>
                <Gapped vertical gap={10}>
                    <FormLine caption="Клиент">{record?.client?.name}</FormLine>
                    <FormLine caption="Телефон">{record?.client?.phone}</FormLine>
                    <FormLine caption="Почта">{record?.client?.email}</FormLine>

                    <FormLine caption="Дата">
                        <DatePicker width={110} value={startDate} onValueChange={setStartDate} />
                    </FormLine>

                    <FormLine caption="Время">
                        <TimePicker width={50} value={startTime} onValueChange={setStartTime} />
                    </FormLine>
                </Gapped>
            </ModalBody>
            {error && <Alert severity="error">{error}</Alert>}
            <ModalFooter>
                <Gapped gap={20}>
                    <Button use="success" onClick={onSubmit} loading={loading}>
                        Сохранить
                    </Button>
                    <Button onClick={onClose}>Отменить</Button>
                </Gapped>
            </ModalFooter>
        </Modal>
    );
};
