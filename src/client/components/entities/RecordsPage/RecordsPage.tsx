import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { RecordsPageTitle } from './RecordsPageTitle';
import { SelectedRoom } from './SelectedRoom/SelectedRoom';
import { ChangeRoomModal } from './ChangeRoomModal/ChangeRoomModal';
import { RecordsList } from './RecordsList/RecordsList';

export const RecordsPage: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const { currentDate, service, currentRoom, isChangeRoomModal, openChangeRoomModal, closeChangeRoomModal, records } =
        recordsStore;

    useAsyncEffectWithError(async signal => {
        await service.init(signal);
    }, []);

    return (
        <div>
            <RecordsPageTitle />
            <SelectedRoom
                room={currentRoom}
                updatePage={service.init}
                changeDate={service.onChangeDate}
                openChangeRoomModal={openChangeRoomModal}
                currentDate={currentDate}
            />
            {currentRoom && (
                <RecordsList
                    records={records}
                    cancelRecord={service.cancelRecord}
                    acceptRecord={service.acceptRecord}
                />
            )}
            {isChangeRoomModal && <ChangeRoomModal changeRoom={service.changeRoom} onClose={closeChangeRoomModal} />}
        </div>
    );
});
