import React, { useState } from 'react';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { CurrencyRuble } from '@mui/icons-material';
import { Alert } from '@mui/material';
import { Button, CurrencyInput, Gapped, Input, Select } from '@skbkontur/react-ui';
import { Modal, ModalBody, ModalFooter, ModalHead } from '../../../ui/Modals/Modal';
import { FormLine } from '../../../ui/FormLine/FormLine';
import {
    ProfessionType,
    professionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Nullable } from '../../../../../common/interfaces/common';
import { isRequiredField } from '../../../../client-tools/validations/validators';
import { LargeRoom, RoomCreateProperties } from '../../../../../server/modules/domains/rooms/entities/room.entity';

interface Props {
    room?: LargeRoom;
    onClose: () => void;
    accept: (properties: RoomCreateProperties) => void;
}

export const LocationModal: React.FC<Props> = ({ room, onClose, accept }) => {
    const [title, setTitle] = useState<string>(room?.title || '');
    const [price, setPrice] = useState<number>(room?.price || 0);
    const [type, setType] = useState<ProfessionType>(room?.type || null);

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [container, refContainer] = useState<Nullable<ValidationContainer>>(null);

    const submitForm = async (isDelete?: boolean) => {
        setLoading(true);

        if (await container.validate()) {
            try {
                await accept({
                    ...room,
                    title,
                    price,
                    type,
                    inBasket: isDelete,
                });

                onClose();
            } catch (e) {
                setError(true);
                setErrorMessage(e.message);
                setLoading(false);
            }
        }
    };

    const convertType = (value: 'Бровист' | 'Парикмахер' | 'Лешмейкер' | 'Мастер маникюра'): ProfessionType => {
        switch (value) {
            case 'Бровист':
                return 'browist';
            case 'Парикмахер':
                return 'barber';
            case 'Лешмейкер':
                return 'lashmaker';
            case 'Мастер маникюра':
                return 'manicurist';
            default:
                break;
        }
    };

    return (
        <Modal onClose={onClose}>
            <ModalHead>{room ? 'Редактирование' : 'Добавление'} локации</ModalHead>
            <ModalBody>
                <ValidationContainer ref={refContainer}>
                    <Gapped vertical gap={10}>
                        <FormLine vertical caption="Название локации">
                            <ValidationWrapper validationInfo={isRequiredField(price)}>
                                <Input placeholder="Название" value={title} onValueChange={setTitle} />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine vertical caption="Профиль локации">
                            <ValidationWrapper validationInfo={isRequiredField(type)}>
                                <Select
                                    width={200}
                                    items={Object.values(professionTypeDict)}
                                    onValueChange={value => setType(convertType(value))}
                                    value={professionTypeDict[type]}
                                />
                            </ValidationWrapper>
                        </FormLine>
                        <FormLine vertical caption="Цена аренды за час">
                            <ValidationWrapper validationInfo={isRequiredField(price)}>
                                <CurrencyInput
                                    width={100}
                                    value={price}
                                    fractionDigits={2}
                                    onValueChange={setPrice}
                                    rightIcon={
                                        <CurrencyRuble style={{ fontSize: '16px', marginTop: '5px' }} color="action" />
                                    }
                                />
                            </ValidationWrapper>
                        </FormLine>
                    </Gapped>
                </ValidationContainer>
            </ModalBody>
            {error && <Alert severity="error">{errorMessage}</Alert>}
            <ModalFooter>
                <Gapped gap={10}>
                    <Button use="success" loading={loading} onClick={() => submitForm(false)}>
                        {room ? 'Сохранить' : 'Добавить'}
                    </Button>
                    <Button onClick={onClose}>Отменить</Button>
                    {room && (
                        <Button use="danger" onClick={() => submitForm(true)}>
                            Удалить
                        </Button>
                    )}
                </Gapped>
            </ModalFooter>
        </Modal>
    );
};
