import React from 'react';
import { Center } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText } from '../../../client-tools/styles/color';
import { TableItem, TableWithItems } from '../../ui/Tables/TableItems/TableWithItems';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { SpecialistsHead } from './SpecialistsHead';
import { SpecialistInfoModal } from './SpecialistInfoModal/SpecialistInfoModal';

export const SpecialistsPage: React.FC = observer(() => {
    const { specialistsStore } = useStores();
    const {
        searchValue,
        specialists,
        isInfoModal,
        openInfoModal,
        closeInfoModal,
        service,
        selectedUser,
    } = specialistsStore;

    useAsyncEffectWithError(async abortSignal => {
        await service.init(abortSignal);
    }, []);
    
    const getTableItems = (): TableItem[] =>
        specialists.map(specialist => ({
            id: specialist?.accountId,
            comment: specialist?.description,
            type: specialist?.profile?.profession,
            name: specialist?.profile?.fullName,
        }));

    return (
        <div>
            <SpecialistsHead searchValue={searchValue} onValueChange={service.onValueSearch} />
            {specialists && <TableWithItems items={getTableItems()} onSettings={openInfoModal} />}
            {!specialists && (
                <Center style={{ marginTop: 50 }}>
                    <Typography color={notActiveText} fontSize={'24px'}>
                        Арендаторы отсутствуют
                    </Typography>
                </Center>
            )}
            {isInfoModal && selectedUser && (
                <SpecialistInfoModal close={closeInfoModal} user={selectedUser} accept={service.updateSpecialist} />
            )}
        </div>
    );
});
