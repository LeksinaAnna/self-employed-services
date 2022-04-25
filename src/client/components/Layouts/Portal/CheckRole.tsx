import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { RoleType } from '../../../../server/modules/domains/roles/entities/role.entity';
import { useStores } from '../../../client-tools/hooks/use-stores';

interface Props {
    role: RoleType;
}

export const CheckRole: React.FC<Props> = observer(({ role }) => {
    const { authStore, appStore: { currentRole } } = useStores();
    const { redirectPath } = authStore;
    
    if (role !== currentRole) {
        return <Navigate to={`/${redirectPath}`} />;
    }

    return <Outlet />
});