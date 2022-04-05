import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../client-tools/hooks/use-async-effect';
import { RegistrationPage } from '../entities/Auth/pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../entities/Auth/pages/LoginPage/LoginPage';
import { LoadingLayout } from '../Layouts/LoadingLoyaout/LoadingLayout';
import { PortalLayout } from '../Layouts/Portal/PortalLayout';

export const App: React.FC = observer(() => {
    const { appStore } = useStores();
    const { service } = appStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <LoadingLayout isLoading={appStore.isLoading}>
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="/" element={<PortalLayout />}>
                    <Route path="/services" />
                    <Route path="/clients" />
                    <Route path="/report" />
                    <Route path="/records" />
                </Route>
            </Routes>
        </LoadingLayout>
    );
});
