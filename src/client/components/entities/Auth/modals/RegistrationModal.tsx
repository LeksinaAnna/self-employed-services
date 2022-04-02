import React, { useEffect } from 'react';
import { Button, Gapped, Modal, Select } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { InputWithCaption } from '../../../ui/Inputs/InputWithCaption';
import { ProfessionTypeDict } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { secondaryText } from '../../../../client-tools/styles/color';
import { Typography } from '../../../ui/Text/Typography';

export const RegistrationModal = observer(() => {
    const { authStore } = useStores();
    const {
        login,
        profession,
        setProfession,
        setLogin,
        password,
        setPassword,
        fullName,
        setFullName,
        isLoading,
        service,
        userProfessionList,
    } = authStore;

    useEffect(() => service.destroy, []);

    return (
        <Modal onClose={service.closeRegistrationModal}>
            <Modal.Header>Регистрация</Modal.Header>
            <Modal.Body>
                <Gapped vertical gap={10}>
                    <InputWithCaption caption={'Фамилия Имя'} vertical value={fullName} onValueChange={setFullName} />
                    <Gapped vertical gap={5}>
                        <Typography color={secondaryText}>Выберите ваш профиль</Typography>
                        <Select
                            width={200}
                            items={userProfessionList}
                            value={ProfessionTypeDict[profession]}
                            onValueChange={setProfession}
                        />
                    </Gapped>
                    <InputWithCaption caption={'Электронная почта'} vertical value={login} onValueChange={setLogin} />
                    <InputWithCaption
                        caption={'Пароль'}
                        vertical
                        type={'password'}
                        value={password}
                        onValueChange={setPassword}
                    />
                </Gapped>
            </Modal.Body>
            <Modal.Footer panel>
                <Gapped gap={40}>
                    <Button use="primary" onClick={service.registration} loading={isLoading}>
                        Зарегистрироваться
                    </Button>
                    <Button onClick={service.closeRegistrationModal}>Отмена</Button>
                </Gapped>
            </Modal.Footer>
        </Modal>
    );
});
