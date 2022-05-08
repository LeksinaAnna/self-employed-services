import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { ErrorModal } from '../../ui/Modals/ErrorModal';
import { RecordsPageTitle } from './RecordsPageTitle';
import { SelectedRoom } from './SelectedRoom/SelectedRoom';
import { ChangeRoomModal } from './ChangeRoomModal/ChangeRoomModal';
import { RecordsList } from './RecordsList/RecordsList';

export const RecordsPage: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const {
        currentDate,
        service,
        currentRoom,
        isChangeRoomModal,
        openChangeRoomModal,
        closeChangeRoomModal,
        destroy,
        pageIsInit,
        isError,
        setIsError
    } = recordsStore;

    useAsyncEffectWithError(async signal => {
        await service.init(signal);
    }, []);

    useEffect(() => destroy, []);

    return (
        <div>
            <RecordsPageTitle />
            <SelectedRoom
                pageIsInit={pageIsInit}
                room={currentRoom}
                updatePage={service.init}
                changeDate={service.onChangeDate}
                openChangeRoomModal={openChangeRoomModal}
                currentDate={currentDate}
            />
            {currentRoom && <RecordsList />}
            {isChangeRoomModal && <ChangeRoomModal changeRoom={service.changeRoom} onClose={closeChangeRoomModal} />}
            {isError && <ErrorModal errorMessage={isError} onClose={() => setIsError(null)} />}
        </div>
    );
});
