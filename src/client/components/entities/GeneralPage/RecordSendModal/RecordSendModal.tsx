import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Stack, Typography } from '@mui/material';
import { Button, Input, Toast } from '@skbkontur/react-ui';
import moment from 'moment';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modals/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { notActiveText, secondaryText } from '../../../../client-tools/styles/color';
import { Nullable } from '../../../../../common/interfaces/common';
import { isRequiredField } from '../../../../client-tools/validations/validators';

interface Props {
    onClose: () => void;
}

export const RecordSendModal: React.FC<Props> = observer(({ onClose }) => {
    const { generalPageStore } = useStores();
    const { _servicesStore, _timesStore, sendRecord } = generalPageStore;
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [container, refContainer] = useState<Nullable<ValidationContainer>>(null);

    const submitForm = async () => {
        setLoading(true);

        try {
            const recordDate = moment(
                _timesStore.currentDate + ' ' + _timesStore.selectedTime,
                'DD.MM.YYYY HH:mm',
            ).format();

            if (await container.validate()) {
                await sendRecord({
                    email,
                    phone,
                    name,
                    recordDate,
                    serviceId: _servicesStore.selectedService.serviceId,
                    specialistId: _servicesStore.selectedSpecialist.profileId,
                });
                Toast.push('Заявка отправлена');
                onClose();
            } else {
                setLoading(false);
            }
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <ModalHead>Отправка заявки</ModalHead>
            <ModalBody>
                <Stack spacing={1}>
                    <FormLine caption="Специалист:">
                        <Typography color={secondaryText}>{_servicesStore.selectedSpecialist?.fullName}</Typography>
                    </FormLine>
                    <FormLine caption="Услуга:">
                        <Typography color={secondaryText}>{_servicesStore.selectedService?.title}</Typography>
                    </FormLine>
                    <FormLine caption="Дата:">
                        <Typography color={secondaryText} fontSize="16px">
                            {_timesStore.currentDate}
                        </Typography>
                    </FormLine>
                    <FormLine caption="Время:">
                        <Typography color={secondaryText}>{_timesStore.selectedTime}</Typography>
                    </FormLine>
                    <FormLine caption="Сумма:">
                        <Typography color={secondaryText}>{_servicesStore.selectedService?.price} руб.</Typography>
                    </FormLine>
                </Stack>
                <ValidationContainer ref={refContainer}>
                    <Stack
                        spacing={1}
                        sx={{ marginTop: '10px', paddingTop: '10px', borderTop: `1px solid ${notActiveText}` }}
                    >
                        <FormLine caption="Ваше имя:">
                            <ValidationWrapper validationInfo={isRequiredField(name)}>
                                <Input placeholder="ФИО" value={name} onValueChange={setName} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption="Контактный телефон:">
                            <ValidationWrapper validationInfo={isRequiredField(phone)}>
                                <Input
                                    mask={'+7 999 999-99-99'}
                                    placeholder={'+7 999 999-99-99'}
                                    value={phone}
                                    onValueChange={setPhone}
                                />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption="Почта:">
                            <Input placeholder="example@gmail.com" value={email} onValueChange={setEmail} />
                        </FormLine>
                    </Stack>
                </ValidationContainer>
            </ModalBody>
            {error && <Alert severity="error">{error}</Alert>}
            <ModalFooter>
                <Stack spacing={3} direction="row">
                    <Button use="success" onClick={submitForm} loading={loading}>
                        Отправить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                </Stack>
            </ModalFooter>
        </Modal>
    );
});
