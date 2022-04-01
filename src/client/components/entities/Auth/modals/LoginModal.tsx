import React from 'react';
import { Button, Gapped, Input, Modal } from '@skbkontur/react-ui';
import { Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';

export const LoginModal: React.FC = observer(() => {
    const { authStore } = useStores();
    const { login, password, setLogin, setPassword } = authStore;

    return (
        <Modal>
            <Modal.Header>Авторизация</Modal.Header>
            <Modal.Body>
                <Gapped vertical gap={10}>
                    <Input placeholder="E-mail" value={login} onValueChange={setLogin} />
                    <Input placeholder="Пароль" type="password" value={password} onValueChange={setPassword} />
                </Gapped>
            </Modal.Body>
            <Modal.Footer panel>
                <Stack direction='row' spacing={6}>
                    <Button use="primary">Войти</Button>
                    <Button use="default">Отмена</Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
});
