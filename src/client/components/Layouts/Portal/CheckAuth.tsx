import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useStores } from '../../../client-tools/hooks/use-stores';

export const CheckAuth: React.FC = observer(() => {
    const { appStore: { isAuth } } = useStores();

    return (
        <>
            {!isAuth ? <Navigate to={'/'} /> : <Outlet />}
        </>
    );
});