import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStores } from '../../../client-tools/hooks/use-stores';

/**
 *
 * Компоненет проверяет авторизован ли пользователь, если нет то редиректит на главную
 */
export const CheckAuth: React.FC = observer(() => {
    const { appStore: { isAuth } } = useStores();
    const location = useLocation();

    // Если href не коренной и пользователь не авторизован то редиректим в корень
    const isRedirect = location.pathname !== '/' && !isAuth && location.pathname !== '/activate';

    // Если редирект не произошел, то мы рисуем "детей" компонента с помощью Outlet
    return (
        <>
            {isRedirect ? <Navigate to={'/'} /> : <Outlet />}
        </>
    );
});