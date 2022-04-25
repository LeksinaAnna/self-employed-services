import React, { useState } from 'react';
import { Input } from '@skbkontur/react-ui';
import SearchIcon from '@mui/icons-material/Search';
import { Alert } from '@mui/material';
import { Modal, ModalBody, ModalHead } from '../../../ui/Modal/Modal';
import { useAsyncEffectWithError } from '../../../../client-tools/hooks/use-async-effect';
import { LargeRoom, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';
import { ItemsList } from './ItemsList/ItemsList';

interface Props {
    onClose: () => void;
    changeRoom: (roomId: RoomId) => void;
}

export const ChangeRoomModal: React.FC<Props> = ({ onClose, changeRoom }) => {
    const [rooms, setRooms] = useState<LargeRoom[]>([]);
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {
        commonApi: { locations },
        appStore,
    } = useStores();

    useAsyncEffectWithError(
        async signal => {
            const response = await locations.getRooms(
                { type: appStore?.userData?.profile?.profession, search, take: '5' },
                signal,
            );
            setRooms(response.items);
        },
        [search],
    );

    const onChangeRoom = async (id: RoomId) => {
        try {
            await changeRoom(id);
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

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

                {rooms.length > 0 && <ItemsList onChange={onChangeRoom} items={rooms} />}
                {rooms.length === 0 && (
                    <Typography fontSize="20px" color={secondaryText}>
                        Локации отсутствуют
                    </Typography>
                )}
            </ModalBody>
            {error && <Alert severity='error'>{error}</Alert>}
        </Modal>
    );
};
