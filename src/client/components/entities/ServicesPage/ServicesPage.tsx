import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';

export const ServicesPage: React.FC = observer(() => {
    const { servicesPageStore } = useStores();
    const { service, isModal } = servicesPageStore;

    useAsyncEffectWithError(async (abortSignal) => {
        await service.init(abortSignal);
    }, [])

    return (
        <div>

        </div>
    );
});