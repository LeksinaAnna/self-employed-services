import React, { useState } from 'react';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { CurrencyRuble } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Alert } from '@mui/material';
import { Button, CurrencyInput, Gapped, Input, Select } from '@skbkontur/react-ui';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modal/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Nullable } from '../../../../../common/interfaces/common';
import { isRequiredField } from '../../../../client-tools/validations/validators';

export const CreateModal: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const {
        service,
        price,
        title,
        setTitle,
        setPrice,
        professionList,
        setProfession,
        profession,
        isLoading,
        setIsLoading,
    } = locationsStore;
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [container, refContainer] = useState<Nullable<ValidationContainer>>(null);

    React.useEffect(
        () => () => {
            setPrice(null);
            setProfession(null);
            setTitle('');
        },
        [],
    );

    const submitForm = async () => {
        if (await container.validate()){
            try {
                await service.createLocation();
            } catch (e) {
                setError(true);
                setErrorMessage(e.message);
                setIsLoading(false);
            }
        }
    };

    return (
        <Modal onClose={service.closeCreateModal}>
            <ModalHead>Добавление локации</ModalHead>
            <ModalBody>
                <ValidationContainer ref={refContainer}>
                    <Gapped vertical gap={10}>
                        <FormLine vertical caption="Название локации">
                            <ValidationWrapper validationInfo={isRequiredField(title)}>
                                <Input placeholder="Название" value={title} onValueChange={setTitle} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine vertical caption="Ценна аренды за час">
                            <ValidationWrapper validationInfo={isRequiredField(price)}>
                                <CurrencyInput
                                    width={100}
                                    value={price}
                                    fractionDigits={2}
                                    onValueChange={setPrice}
                                    rightIcon={<CurrencyRuble style={{ fontSize: '16px', marginTop: '5px' }} color="action" />}
                                />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine vertical caption="Профиль локации">
                            <ValidationWrapper validationInfo={isRequiredField(profession)}>
                                <Select
                                    width={200}
                                    items={professionList}
                                    onValueChange={setProfession}
                                    value={professionTypeDict[profession]}
                                />
                            </ValidationWrapper>
                        </FormLine>
                    </Gapped>
                </ValidationContainer>
            </ModalBody>
            {error && <Alert severity="error">{errorMessage}</Alert>}
            <ModalFooter>
                <Gapped gap={10}>
                    <Button use="success" loading={isLoading} onClick={submitForm}>
                        Добавить
                    </Button>
                    <Button onClick={service.closeCreateModal}>Отменить</Button>
                </Gapped>
            </ModalFooter>
        </Modal>
    );
});
