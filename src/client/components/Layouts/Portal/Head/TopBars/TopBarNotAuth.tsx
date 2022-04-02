import React from 'react';
import { Button, Gapped } from '@skbkontur/react-ui';
import { TopBarContainer } from '../../../../ui/Containers/TopBarContainer';

interface Props {
    openLoginModal: () => void;
    openRegModal: () => void;
}

export const TopBarNotAuth: React.FC<Props> = ({ openLoginModal, openRegModal }) => (
    <TopBarContainer>
        <Gapped gap={20}>
            <Button use="link" size="medium" onClick={openLoginModal}>
                Войти
            </Button>
            <Button use="link" size="medium" onClick={openRegModal}>
                Зарегистрироваться
            </Button>
        </Gapped>
    </TopBarContainer>
);
