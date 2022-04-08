import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { TimePicker } from '../../../ui/Date/TimePicker';
import { notActiveText } from '../../../../client-tools/styles/color';
import { Typography } from '../../../ui/Text/Typography';

interface Props {
    time: string;
    accept: () => void;
    close: () => void;
}

const ModalWrapper = styled.div`
  padding: 10px;
    background: #222;
    opacity: 0.8;
    position: absolute;
    z-index: 2;
    left: -50px;
`;

export const CreateRental: React.FC<Props> = ({ time, close }) => {
    const ref = useRef();

    const onClickWithout = e => {
        if (!e.path.includes(ref.current)) {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener('click', onClickWithout);
        return () => document.removeEventListener('click', onClickWithout);
    }, []);

    return (
        <ModalWrapper ref={ref}>
            <Typography color={'#fff'} fontSize={'18px'}>Создание аренды</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TimePicker width={60} />
                <span style={{ color: notActiveText, margin: '0 5px' }}>&mdash;</span>
                <TimePicker width={60} />
            </div>
        </ModalWrapper>
    );
};
