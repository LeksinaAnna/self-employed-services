import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../client-tools/hooks/use-async-effect';
import { RegistrationPage } from '../entities/Auth/pages/RegistrationPage/RegistrationPage';
import { LoginPage } from '../entities/Auth/pages/LoginPage/LoginPage';
import { LoadingLayout } from '../Layouts/LoadingLoyaout/LoadingLayout';
import { PortalLayout } from '../Layouts/Portal/PortalLayout';
import { CheckAuth } from '../Layouts/Portal/CheckAuth';
import { PageNotFound } from '../Errors/PageNotFound/PageNotFound';
import { LocationsPage } from '../entities/Locations/LocationsPage';
import { SpecialistsPage } from '../entities/Specialists/SpecialistsPage';
import { ReportPage } from '../entities/AdminReport/ReportPage';
import { ServicesPage } from '../entities/ServicesPage/ServicesPage';
import { ClientsPage } from '../entities/Clients/ClientsPage';
import { RecordsPage } from '../entities/RecordsPage/RecordsPage';


/**
 *
 * Главный компонент, который рисует все приложение
 */
export const App: React.FC = observer(() => {
    const { appStore } = useStores();
    const { service } = appStore;

    // Состояние проинициализировалось ли приложение
    const [appInit, setAppInit] = useState<boolean>(false);

    // При первой отрисовки приложения выполняется эта функция
    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);

        // После успешных инициализационных запросов считаем что приложение проинициализировано
        setAppInit(true);
    }, []);

    return (
        <LoadingLayout isLoading={appStore.isLoading} isInit={appInit}>
            <Routes>
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="*" element={<CheckAuth />}>
                    <Route path="*" element={<PortalLayout />}>
                        <Route path="admin/locations" element={<LocationsPage />} />
                        <Route path="admin/tenantry" element={<SpecialistsPage />} />
                        <Route path="admin/report" element={<ReportPage />} />
                        <Route path="specialist/services" element={<ServicesPage />} />
                        <Route path="specialist/clients" element={<ClientsPage />}/>
                        <Route path="specialist/records" element={<RecordsPage />} />
                        <Route path="specialist/report" element={<div>ОТЧЕТ</div>} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>
            </Routes>
        </LoadingLayout>
    );
});
