import React from 'react';
import styled from '@emotion/styled';
import { Button, Gapped } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { Alert, Box } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { BackgroundContainer } from '../../../../ui/Containers/BackgroundContainer';
import { secondaryText } from '../../../../../client-tools/styles/color';
import { FooterPage } from './FooterPage';
import { Body, BodyPage } from './Body';

export const RegistrationPage = observer(() => {
    const { authStore, appStore } = useStores();
    const {
        isLoading,
        setIsLoading,
        service,
        container,
        isError,
        setIsError,
        errorMessage,
        setErrorMessage,
        isRegistration,
        redirectPath,
    } = authStore;

    const navigation = useNavigate();

    const onSubmitForm = async () => {
        if (await container.validate()) {
            try {
                await service.registration();
                setIsError(false);
                setErrorMessage('');
            } catch (e) {
                setIsError(true);
                setErrorMessage(e.message);
                setIsLoading(false);
            }
        }
    };

    React.useEffect(() => service.destroy, []);

    return (
        <BackgroundContainer>
            <Box maxWidth={400} sx={{ backgroundColor: '#fff', borderRadius: 5 }}>
                <HeaderPage>Регистрация</HeaderPage>
                {!isRegistration && <Body />}
                {isRegistration && (
                    <BodyPage>
                        <Alert severity="success">Пользователь успешно зарегистрирован!</Alert>
                    </BodyPage>
                )}
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <FooterPage>
                    {!isRegistration && (
                        <Gapped gap={30}>
                            <Button use={'primary'} onClick={onSubmitForm} loading={isLoading}>
                                Регистрация
                            </Button>
                            <Button use={'default'} onClick={() => navigation('/', { replace: true })}>
                                На главную
                            </Button>
                        </Gapped>
                    )}
                    {isRegistration && (
                        <Button use={'success'} onClick={() => navigation('/', { replace: true })}>
                            На главную
                        </Button>
                    )}
                </FooterPage>
            </Box>
            {appStore.isAuth && <Navigate to={`/${redirectPath}`} replace={true} />}
        </BackgroundContainer>
    );
});

export const HeaderPage = styled.div`
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    height: 50px;
    padding-top: 15px;
    color: ${secondaryText};
`;
