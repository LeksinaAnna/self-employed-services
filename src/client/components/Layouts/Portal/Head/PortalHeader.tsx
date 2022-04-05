import React from 'react';
import { observer } from 'mobx-react-lite';
import { TopBarContainer } from '../../../ui/Containers/TopBarContainer';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { TopBarIsAuth } from './TopBars/TopBarIsAuth';

export const PortalHeader = observer(() => {
    const {
        appStore: { isAuth },
    } = useStores();

    return (
        <>
            {isAuth && <TopBarIsAuth />}
            {!isAuth && <TopBarContainer />}
        </>
    );
});
