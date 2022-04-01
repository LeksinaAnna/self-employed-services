import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../client-tools/hooks/use-stores';
import { PortalLayout } from '../Layouts/Portal/PortalLayout';
import { useAsyncEffectWithError } from '../../client-tools/hooks/use-async-effect';

export const App: React.FC = observer(() => {
    const { appStore } = useStores();
    const { service } = appStore;

    useAsyncEffectWithError(async (abortSignal) => {
        await service.init(abortSignal);
    }, [])

    return (
        <PortalLayout>

        </PortalLayout>
    );
});
