import React, { useState } from 'react';
import { Input } from '@skbkontur/react-ui';
import SearchIcon from '@mui/icons-material/Search';
import { Modal, ModalBody, ModalHead } from '../../../ui/Modal/Modal';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { LargeRoom, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { ItemsList } from './ItemsList/ItemsList';
import { notActiveText } from '../../../../client-tools/styles/color';

interface Props {
    onClose: () => void;
    changeRoom: (roomId: RoomId) => void;
}

export const ChangeRoomModal: React.FC<Props> = ({ onClose, changeRoom }) => {
    const [rooms, setRooms] = useState<LargeRoom[]>([]);
    const [search, setSearch] = useState<string>('');
    const {
        commonApi: { locations },
        appStore,
    } = useStores();

    useAsyncEffectWithError(
        async signal => {
            const response = await locations.getRooms(
                { type: appStore?.userData?.profile?.profession, search },
                signal,
            );
            setRooms(response.items);
        },
        [search],
    );

    return (
        <Modal onClose={onClose} width={450}>
            <ModalHead>Выбор локации</ModalHead>
            <ModalBody>
                <div
                    style={{
                        padding: '10px 0',
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Input
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Поиск локаций"
                        rightIcon={<SearchIcon color="action" style={{ marginTop: '5px' }} />}
                    />
                </div>

                {rooms.length > 0 && <ItemsList onChange={changeRoom} items={rooms} />}
                {rooms.length === 0 && <div>Локации отсутствуют</div>}
            </ModalBody>
        </Modal>
    );
};
