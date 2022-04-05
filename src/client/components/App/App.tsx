import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../client-tools/hooks/use-async-effect';
import { RegistrationPage } from '../entities/Auth/pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../entities/Auth/pages/LoginPage/LoginPage';
import { LoadingLayout } from '../Layouts/LoadingLoyaout/LoadingLayout';
import { PortalLayout } from '../Layouts/Portal/PortalLayout';
import { CheckAuth } from '../Layouts/Portal/CheckAuth';

export const App: React.FC = observer(() => {
    const { appStore } = useStores();
    const { service } = appStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);

    return (
        <LoadingLayout isLoading={appStore.isLoading} isInit={appStore.appIsInit}>
            <Routes>
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<PortalLayout />}>
                    <Route path="admin" element={<CheckAuth />}>
                        <Route path="locations" element={<div>ТЕСТ</div>}/>
                        <Route path="tenantry" element={<div>ТЕСТ</div>}/>
                        <Route path="report" element={<div>ТЕСТ</div>}/>
                    </Route>
                    <Route path="specialist" element={<CheckAuth />}>
                        <Route path="services" element={<div>ТЕСТ</div>}/>
                        <Route path="clients" element={<div>ТЕСТ</div>}/>
                        <Route path="report" element={<div>ТЕСТ</div>}/>
                        <Route path="records" element={<div>ТЕСТ</div>}/>
                    </Route>
                </Route>
            </Routes>
        </LoadingLayout>
    );
});
