import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { TopBarIsAuth } from './TopBars/TopBarIsAuth';
import { TopBarNotAuth } from './TopBars/TopBarNotAuth';

export const PortalHeader = observer(() => {
    const {
        appStore: { isAuth },
        authStore,
    } = useStores();
    const { service } = authStore;

    return (
        <>
            {!isAuth && (
                <TopBarNotAuth openLoginModal={service.openLoginModal} openRegModal={service.openRegistrationModal} />
            )}
            {isAuth && <TopBarIsAuth />}
        </>
    );
});
