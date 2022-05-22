import React, { useState } from 'react';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Center } from '@skbkontur/react-ui';
import { secondaryText } from '../../../client-tools/styles/color';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';

export const ActivationPage: React.FC = () => {
    const {
        commonApi: { auth },
    } = useStores();
    const [isActivate, setIsActivate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useAsyncEffectWithError(async abortSignal => {
        // Если в query параметре нет key, то редиректнем на главную
        if (!params.get('key')) {
            navigate('/');
            return null;
        }

        setLoading(true);

        try {
            await auth.activateAccount(params.get('key'), abortSignal);
            setIsActivate(true);
        } catch (e) {
            setError(e.message);
        }

        setLoading(false);
    }, []);

    return (
        <div style={{ height: '100%' }}>
            <Center>
                {isActivate && !loading && (
                    <Stack spacing={2}>
                        <Typography color={secondaryText} fontSize="26px">
                            Аккаунт успешно активирован
                        </Typography>
                        <Center>
                            <Button use="link" size="medium" onClick={() => navigate('/login')}>
                                Авторизоваться
                            </Button>
                        </Center>
                    </Stack>
                )}
                {loading && (
                    <Stack spacing={3}>
                        <Typography color={secondaryText} fontSize={'24px'}>
                            Активация аккаунта
                        </Typography>
                        <Center>
                            <CircularProgress color="primary" />
                        </Center>
                    </Stack>
                )}
                {error && (
                    <Box padding={4}>
                        <Stack spacing={2}>
                            <Center>
                                <Typography color={secondaryText} fontSize={'24px'}>
                                    Ошибка активации
                                </Typography>
                            </Center>
                            <Alert severity="error">{error}</Alert>
                            <Center>
                                <Button use='link' onClick={() => navigate('/')}>На главную</Button>
                            </Center>
                        </Stack>
                    </Box>
                )}
            </Center>
        </div>
    );
};
