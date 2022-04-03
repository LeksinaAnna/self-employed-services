import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { defaultPortalColor } from '../../../../client-tools/styles/color';
import { AdminMenu } from './Menus/AdminMenu';
import { SpecialistMenu } from './Menus/SpecialistMenu';
import { DefaultMenu } from './Menus/DefaultMenu';

export const MenuWrapper = styled.div`
    width: 100px;
    border-right: 1px solid ${defaultPortalColor};
    display: flex;
    flex-direction: column;
`;

export const ServiceMenuPanel: React.FC = observer(() => {
    const { appStore } = useStores();
    const { userData } = appStore;

    const roles = userData?.roles?.map(role => role.value) || [];

    if (roles.includes('ADMIN')) {
        return <AdminMenu />;
    }

    if (roles.includes('SPECIALIST')) {
        return <SpecialistMenu />;
    }

    if (roles.includes('USER')) {
        return <></>;
    }

    return <DefaultMenu />;
});
