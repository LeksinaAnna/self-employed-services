import React, { useEffect } from 'react';
import { Button, Gapped, Modal } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { InputWithCaption } from '../../../ui/Inputs/InputWithCaption';

export const LoginModal: React.FC = observer(() => {
    const { authStore } = useStores();
    const { login, password, setLogin, setPassword, service, isLoading } = authStore;

    useEffect(() => service.destroy, []);

    return (
        <Modal onClose={service.closeLoginModal}>
            <Modal.Header>Авторизация</Modal.Header>
            <Modal.Body>
                <Gapped vertical gap={10}>
                    <InputWithCaption vertical value={login} onValueChange={setLogin} caption={'E-mail'} />
                    <InputWithCaption vertical type="password" value={password} onValueChange={setPassword} caption={'Пароль'} />
                </Gapped>
            </Modal.Body>
            <Modal.Footer panel>
                <Gapped gap={40}>
                    <Button use="primary" onClick={service.login} loading={isLoading}>
                        Войти
                    </Button>
                    <Button use="default" onClick={service.closeLoginModal}>
                        Отмена
                    </Button>
                </Gapped>
            </Modal.Footer>
        </Modal>
    );
});
