import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { voidFunction } from '../../../../../common/js-tools/void-function';

interface ModalProps {
    width?: number;
    close?: () => void;
}

const ModalWrapper = styled.div<{ widthProp: number }>(({ widthProp }) => ({
    padding: 10,
    background: '#afacac',
    width: widthProp,
    marginLeft: -(widthProp + 20) / 2,
    marginTop: 5,
}));

export const CalendarModal: React.FC<ModalProps> = ({ width = 220, close = voidFunction, children }) => {
    const modalRef = useRef(null);
    const onClickWithout = e => {
        // если клик вне окна то запускаем close()
        if (!modalRef?.current.contains(e.target)) {
            close();
        }
    };

    useEffect(() => {
        // отлавливаем клик через mousedown, сработает как только отпустят кнопку мыши
        document.addEventListener('mousedown', onClickWithout, false);

        // удаляем отлавливальщика чтобы избежать утечки памяти
        return () => document.removeEventListener('mousedown', onClickWithout, false);
    }, []);

    return (
        <ModalWrapper ref={modalRef} widthProp={width}>
            {children}
        </ModalWrapper>
    );
};

export const CalendarModalHead = styled.div`
    margin-top: 10px;
`;

export const CalendarModalBody = styled.div`
    margin-top: 10px;
`;

export const CalendarModalFooter = styled.div`
    margin-top: 10px;
`;
