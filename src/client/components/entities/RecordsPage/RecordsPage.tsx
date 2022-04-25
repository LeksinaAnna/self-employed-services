import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, DatePicker, Gapped } from '@skbkontur/react-ui';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { useAsyncEffectWithError } from '../../../client-tools/hooks/use-async-effect';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';
import { RecordsPageHead } from './RecordsPageHead';
import { SelectedRoom } from './SelectedRoom/SelectedRoom';
import { ChangeRoomModal } from './ChangeRoomModal/ChangeRoomModal';

export const RecordsPage: React.FC = observer(() => {
    const { recordsStore } = useStores();
    const {
        currentDate,
        service,
        currentRoom,
        isChangeRoomModal,
        openChangeRoomModal,
        closeChangeRoomModal,
    } = recordsStore;

    useAsyncEffectWithError(async signal => {
        await service.init(signal);
    }, []);

    return (
        <div>
            <RecordsPageHead />
            <div style={{ margin: '18px 0' }}>
                {currentRoom && (
                    <>
                        <DatePicker width={100} onValueChange={service.onChangeDate} value={currentDate} />
                        <SelectedRoom room={currentRoom} updatePage={service.init} />
                    </>
                )}
                {!currentRoom && (
                    <Gapped gap={20}>
                        <Typography fontSize={'20px'} color={secondaryText}>
                            У вас не выбрана локация
                        </Typography>
                        <Button use="link" size="medium" onClick={openChangeRoomModal}>
                            Выбрать локацию
                        </Button>
                    </Gapped>
                )}
            </div>
            {isChangeRoomModal && <ChangeRoomModal changeRoom={service.changeRoom} onClose={closeChangeRoomModal} />}
        </div>
    );
});
