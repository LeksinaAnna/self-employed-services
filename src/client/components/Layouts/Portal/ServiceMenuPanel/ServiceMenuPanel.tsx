import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { defaultPortalColor } from '../../../../client-tools/styles/color';
import { AdminMenu } from './Menus/AdminMenu';
import { SpecialistMenu } from './Menus/SpecialistMenu';

export const MenuWrapper = styled.div`
    width: 120px;
    box-shadow: 2px 0 0 0 ${defaultPortalColor};
    display: flex;
    flex-direction: column;
  
`;

export const ServiceMenuPanel: React.FC = observer(() => {
    const { appStore } = useStores();
    const { userData } = appStore;

    const roles = userData?.roles?.map(role => role.value) || [];

    const getMenu = () => {
        if (roles.includes('ADMIN')) {
            return <Route path='admin/*' element={<AdminMenu />} />;
        }

        if (roles.includes('SPECIALIST')) {
            return <Route path='specialist/*' element={<SpecialistMenu />} />;
        }

        if (roles.includes('USER')) {
            return <></>;
        }

        // return <Route path='/*' element={<DefaultMenu />} />; На этом месте должна быть дефолтная панель
    }

    return (
        <Routes>
            {getMenu()}
        </Routes>
    )
});
