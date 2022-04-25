import React from 'react';
import { observer } from 'mobx-react-lite';
import { Center } from '@skbkontur/react-ui';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { TableItem, TableWithItems } from '../../ui/Tables/TableItems/TableWithItems';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText } from '../../../client-tools/styles/color';
import { ClientsPageHead } from './ClientsPageHead';
import { SettingsModal } from './SettingsModal/SettingsModal';

export const ClientsPage = observer(() => {
    const { clientsStore } = useStores();
    const { service, searchValue, clients, openSettingsModal, isSettingsModal, closeSettingsModal, selectedClient } = clientsStore;

    useAsyncEffectWithError(async (signal) => {
        await service.init(signal);
    }, []);

    const getTableItems = (): TableItem[] =>
        clients.map(client => ({
            id: client?.clientId,
            comment: client?.description,
            name: client?.name,
        }));

    return (
        <div>
            <ClientsPageHead searchValue={searchValue} onValueChange={service.onSearchValue} />
            {clients.length > 0 && <TableWithItems items={getTableItems()} onSettings={openSettingsModal} />}
            {clients.length === 0 && (
                <Center style={{ marginTop: 50 }}>
                    <Typography color={notActiveText} fontSize={'24px'}>
                        Клиенты отсутствуют
                    </Typography>
                </Center>
            )}
            {isSettingsModal && <SettingsModal close={closeSettingsModal} client={selectedClient} accept={service.updateClient} />}
        </div>
    );
});