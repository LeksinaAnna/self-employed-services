import React, { useState } from 'react';
import { CurrencyRuble } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Alert } from '@mui/material';
import { Button, CurrencyInput, Gapped, Input, Select } from '@skbkontur/react-ui';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modal/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

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

    React.useEffect(
        () => () => {
            setPrice(null);
            setProfession(null);
            setTitle('');
        },
        [],
    );

    const submitForm = async () => {
        try {
            await service.createLocation();
        } catch (e) {
            setError(true);
            setErrorMessage(e.message);
            setIsLoading(false);
        }
    };

    return (
        <Modal onClose={service.closeCreateModal}>
            <ModalHead>Добавление локации</ModalHead>
            <ModalBody>
                <Gapped vertical gap={10}>
                    <FormLine vertical caption="Название локации">
                        <Input placeholder="Название" value={title} onValueChange={setTitle} />
                    </FormLine>
                    <FormLine vertical caption="Ценна аренды за час">
                        <CurrencyInput
                            width={100}
                            value={price}
                            fractionDigits={2}
                            onValueChange={setPrice}
                            rightIcon={<CurrencyRuble style={{ fontSize: '16px', marginTop: '5px' }} color="action" />}
                        />
                    </FormLine>
                    <FormLine vertical caption="Профиль локации">
                        <Select
                            width={200}
                            items={professionList}
                            onValueChange={setProfession}
                            value={professionTypeDict[profession]}
                        />
                    </FormLine>
                </Gapped>
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
