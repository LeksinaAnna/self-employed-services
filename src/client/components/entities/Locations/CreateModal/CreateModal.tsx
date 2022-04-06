import React from 'react';
import { CurrencyRuble } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { Button, CurrencyInput, Gapped, Input, Select } from '@skbkontur/react-ui';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modal/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { professionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

export const CreateModal: React.FC = observer(() => {
    const { locationsStore } = useStores();
    const { service, price, setPrice, professionList, setProfession, profession } = locationsStore;

    return (
        <Modal onClose={service.closeCreateModal}>
            <ModalHead>Добавление локации</ModalHead>
            <ModalBody>
                <Gapped vertical gap={10}>
                    <FormLine vertical caption="Название локации">
                        <Input placeholder="Название" />
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
            <ModalFooter>
                <Gapped gap={10}>
                    <Button use="success">Добавить</Button>
                    <Button onClick={service.closeCreateModal}>Отменить</Button>
                </Gapped>
            </ModalFooter>
        </Modal>
    );
});
