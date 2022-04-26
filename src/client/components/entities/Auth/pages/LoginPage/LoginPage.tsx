import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Gapped, Input, Link } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Alert, Box } from '@mui/material';
import { BackgroundContainer } from '../../../../ui/Containers/BackgroundContainer';
import { HeaderPage } from '../RegistrationPage/RegistrationPage';
import { BodyPage } from '../RegistrationPage/Body';
import { FormLine } from '../../../../ui/FormLine/FormLine';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { isRequiredField } from '../../../../../client-tools/validations/validators';
import { FooterPage } from '../RegistrationPage/FooterPage';
import { Typography } from '../../../../ui/Text/Typography';
import { secondaryText } from '../../../../../client-tools/styles/color';

export const LoginPage = observer(() => {
    const { authStore, appStore } = useStores();
    const {
        login,
        setLogin,
        password,
        setPassword,
        isError,
        setIsError,
        errorMessage,
        setErrorMessage,
        service,
        isLoading,
        setIsLoading,
        container,
        refContainer,
        redirectPath,
    } = authStore;

    const navigation = useNavigate();

    const onSubmit = async () => {
        if (await container.validate()) {
            try {
                await service.login();
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
                <HeaderPage>Авторизация</HeaderPage>
                <BodyPage>
                    <ValidationContainer ref={refContainer}>
                        <Gapped vertical gap={15}>
                            <FormLine caption={'Электронная почта'}>
                                <ValidationWrapper validationInfo={isRequiredField(login)}>
                                    <Input value={login} onValueChange={setLogin} />
                                </ValidationWrapper>
                            </FormLine>
                            <FormLine caption={'Пароль'}>
                                <ValidationWrapper validationInfo={isRequiredField(password)}>
                                    <Input type="password" value={password} onValueChange={setPassword} />
                                </ValidationWrapper>
                            </FormLine>
                            <Typography color={secondaryText}>
                                Нет аккаунта? <Link href={'/registration'}>Зарегистрируйся</Link>
                            </Typography>
                        </Gapped>
                    </ValidationContainer>

                </BodyPage>
                {isError && <Alert severity="error">{errorMessage}</Alert>}
                <FooterPage>
                    <Gapped gap={30}>
                        <Button use="primary" onClick={onSubmit} loading={isLoading}>
                            Войти
                        </Button>
                        <Button use={'default'} onClick={() => navigation('/', { replace: true })}>
                            На главную
                        </Button>
                    </Gapped>
                </FooterPage>
            </Box>
            {appStore.isAuth && <Navigate to={`/${redirectPath}`} replace={true} />}
        </BackgroundContainer>
    );
});
