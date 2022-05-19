import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert } from '@mui/material';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Button, CurrencyInput, Gapped, Input, Textarea } from '@skbkontur/react-ui';
import { CurrencyRuble } from '@mui/icons-material';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modals/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { TimePicker } from '../../../ui/Date/TimePicker';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';
import { isRequiredField } from '../../../../client-tools/validations/validators';


export const CreateServiceModal: React.FC = observer(() => {
    const { servicesPageStore } = useStores();
    const {
        title,
        setTitle,
        duration,
        setDuration,
        price,
        setPrice,
        description,
        setDescription,
        timeText,
        isLoading,
        setIsLoading,
        destroy,
        service,
        selectedService,
    } = servicesPageStore;
    const [container, refContainer] = useState<ValidationContainer>(null);
    const [error, setError] = useState<string>('');

    const onSubmit = async () => {
        if (await container.validate()) {
            try {
                await service.createServiceItem();
            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }
        }
    };

    React.useEffect(() => destroy, []);

    return (
        <Modal onClose={service.closeCreateModal}>
            <ModalHead>{selectedService ? 'Редактирование' : 'Добавление'} услуги</ModalHead>
            <ModalBody>
                <ValidationContainer ref={refContainer}>
                    <Gapped vertical gap={10}>
                        <FormLine caption="Название услуги" vertical>
                            <ValidationWrapper validationInfo={isRequiredField(title)}>
                                <Input value={title} onValueChange={setTitle} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption="Продолжительность" vertical>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TimePicker
                                    styles={{ marginRight: 10 }}
                                    width={50}
                                    value={duration}
                                    onValueChange={setDuration}
                                />
                                <Typography color={secondaryText} fontSize="14px">
                                    {timeText}
                                </Typography>
                            </div>
                        </FormLine>
                        <FormLine caption="Стоимость" vertical>
                            <ValidationWrapper validationInfo={isRequiredField(price)}>
                                <CurrencyInput
                                    width={100}
                                    fractionDigits={2}
                                    value={price}
                                    onValueChange={setPrice}
                                    rightIcon={
                                        <CurrencyRuble style={{ fontSize: '16px', marginTop: '5px' }} color="action" />
                                    }
                                />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine caption="Описание" vertical>
                            <Textarea value={description} onValueChange={setDescription} />
                        </FormLine>
                    </Gapped>
                </ValidationContainer>
            </ModalBody>
            {error && <Alert severity="error">{error}</Alert>}
            <ModalFooter>
                <Gapped gap={10}>
                    <Button use="success" onClick={onSubmit} loading={isLoading}>
                        Сохранить
                    </Button>
                    <Button onClick={service.closeCreateModal}>Отменить</Button>
                </Gapped>
            </ModalFooter>
        </Modal>
    );
});
