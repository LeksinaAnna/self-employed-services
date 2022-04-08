import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Hint } from '@skbkontur/react-ui';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../client-tools/hooks/use-stores';
import { darkBackground, notActiveText, secondaryText } from '../../../../client-tools/styles/color';
import { CreateRental } from './CreateRental';

interface Cell {
    widthProp: number | string;
    isActive?: boolean;
}

/**
 * Компонент-ячейка для календаря
 *
 * @param widthProp - ширина ячейки 1минута = 1px
 * @param isActive - boolean, активная ли ячейка
 */
const CellWrapper = styled.div<Cell>(({ widthProp, isActive }) => ({
    width: widthProp,
    height: 35,
    boxShadow: `0 0 0 1px ${secondaryText}`,
    backgroundColor: !isActive ? '#fff' : notActiveText,
    cursor: 'pointer',
    ['&:hover']: {
        backgroundColor: !isActive ? darkBackground : '#b6b3b3',
    },
}));

interface Props {
    width: number | string;
    isActive?: boolean;
    time: string;
    hintText: React.ReactNode;
}

export const CalendarCell: React.FC<Props> = observer(({ width, isActive, time, hintText }) => {
    const { locationsStore } = useStores();
    const { openedCreateRentalModal, setRentalModal } = locationsStore;
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
            {!openedCreateRentalModal && (
                <Hint text={hintText}>
                    <CellWrapper onClick={openCreateModal} widthProp={width} isActive={isActive} />
                </Hint>
            )}
            {openedCreateRentalModal && <CellWrapper onClick={openCreateModal} widthProp={width} isActive={isModal || isActive} />}
            {isModal && <CreateRental time={time} accept={() => console.log('OK')} close={closeCreateModal} />}
        </div>
    );
});
