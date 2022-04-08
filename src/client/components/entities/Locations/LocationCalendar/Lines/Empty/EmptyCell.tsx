import React, { useState } from 'react';
import { Hint } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../../client-tools/hooks/use-stores';
import { CreateRental } from '../../CreateRental';
import { CalendarCell } from '../../CalendarCell';

interface Props {
    width: number | string;
    isActive?: boolean;
    time: string;
    hintText: React.ReactNode;
}

export const EmptyCell: React.FC<Props> = observer(({ width, isActive, time, hintText }) => {
    const { locationsStore } = useStores();
    const { isCreateRentalModal, setRentalModal } = locationsStore;
    const [isModal, setModal] = useState(false);

    const openCreateModal = () => {
        // Исскуственно замедляем открытие, для того чтобы верхние перехватчики клика могли отработать первее
        setTimeout(() => {
            setModal(true);
            setRentalModal(true);
        }, 10);
    };

    const closeCreateModal = () => {
        setModal(false);
        setRentalModal(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            {!isCreateRentalModal && (
                <Hint text={hintText}>
                    <CalendarCell onClick={openCreateModal} widthProp={width} isActive={isActive} />
                </Hint>
            )}
            {isCreateRentalModal && <CalendarCell onClick={openCreateModal} widthProp={width} isActive={isModal || isActive} />}
            {isModal && isCreateRentalModal && <CreateRental time={time} accept={() => console.log('OK')} close={closeCreateModal} />}
        </div>
    );
});
