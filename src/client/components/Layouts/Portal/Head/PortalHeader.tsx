import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@skbkontur/react-ui';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TopBarContainer } from '../../../ui/Containers/TopBarContainer';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { TopBarIsAuth } from './TopBars/TopBarIsAuth';

export const PortalHeader = observer(() => {
    const {
        appStore: { isAuth },
    } = useStores();

    const navigate = useNavigate();

    return (
        <>
            {isAuth && <TopBarIsAuth />}
            {!isAuth && (
                <TopBarContainer>
                    <Stack spacing={2} direction='row'>
                        <Button use="link" onClick={() => navigate('/login')}>Войти</Button>
                        <Button use="link" onClick={() => navigate('/registration')}>Регистрация</Button>
                    </Stack>
                </TopBarContainer>
            )}
        </>
    );
});
