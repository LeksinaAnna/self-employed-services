import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { TopBarIsAuth } from './TopBars/TopBarIsAuth';

export const PortalHeader = observer(() => {
    const {
        appStore: { isAuth },
    } = useStores();

    return (
        <>
            {/* {!isAuth && (*/}
            {/*    <TopBarNotAuth openLoginModal={service.openLoginModal} openRegModal={service.openRegistrationModal} />*/}
            {/* )} */}
            {isAuth && <TopBarIsAuth />}
        </>
    );
});
