import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Gapped, Input } from '@skbkontur/react-ui';
import { ValidationContainer, ValidationWrapper } from '@skbkontur/react-ui-validations';
import { Alert, Box } from '@mui/material';
import { BackgroundContainer } from '../../../../ui/Containers/BackgroundContainer';
import { HeaderPage } from '../RegistrationPage/RegistrationPage';
import { BodyPage } from '../RegistrationPage/Body';
import { FormLine } from '../../../../ui/FormLine/FormLine';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { isRequiredField } from '../../../../../client-tools/validations/validators';
import { FooterPage } from '../RegistrationPage/FooterPage';

export const LoginPage = observer(() => {
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
    } = useStores().authStore;

    const navigation = useNavigate();

    const onSubmit = async () => {
        if (await container.validate()) {
            try {
                await service.login();
                navigation('/', { replace: true });
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
        </BackgroundContainer>
    );
});
