import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { defaultPortalColor } from '../../../../client-tools/styles/color';
import { AdminMenu } from './Menus/AdminMenu';
import { SpecialistMenu } from './Menus/SpecialistMenu';

export const MenuWrapper = styled.div`
    width: 100px;
    border-right: 1px solid ${defaultPortalColor};
    display: flex;
    flex-direction: column;
`;

export const ServiceMenuPanel: React.FC = observer(() => {
    const { appStore } = useStores();
    const { userData } = appStore;

    switch (userData?.roles[0]?.value) {
        case 'ADMIN':
            return <AdminMenu />;

        case 'SPECIALIST':
            return <SpecialistMenu />;

        case 'USER':
            return <></>;

        default:
            return <></>;
    }
});
