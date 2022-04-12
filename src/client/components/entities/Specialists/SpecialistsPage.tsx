import React from 'react';
import styled from '@emotion/styled';
import { Center } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { Typography } from '../../ui/Text/Typography';
import { notActiveText, secondaryText } from '../../../client-tools/styles/color';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { SpecialistsHead } from './SpecialistsHead';
import { SpecialistItem } from './SpecialistItem';
import { SpecialistInfoModal } from './SpecialistInfoModal/SpecialistInfoModal';

const TableHead = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    border-bottom: 1px solid ${notActiveText};
`;

export const SpecialistsPage: React.FC = observer(() => {
    const { specialistsStore } = useStores();
    const {
        searchValue,
        setSearchValue,
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

    return (
        <div>
            <SpecialistsHead searchValue={searchValue} onValueChange={setSearchValue} />
            {specialists && (
                <TableHead>
                    <Typography color={secondaryText} fontSize={'14px'}>
                        Комментарий
                    </Typography>
                </TableHead>
            )}
            {specialists && specialists.map(user => <SpecialistItem key={user.accountId} openModal={openInfoModal} user={user} />)}
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
