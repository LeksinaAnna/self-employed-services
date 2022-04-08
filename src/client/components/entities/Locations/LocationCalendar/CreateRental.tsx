import React, { useEffect, useRef, useState } from 'react';
import { Button, Gapped, Select } from '@skbkontur/react-ui';
import styled from '@emotion/styled';
import { TimePicker } from '../../../ui/Date/TimePicker';
import { Typography } from '../../../ui/Text/Typography';
import { LargeUser } from '../../../../../server/modules/domains/users/entities/user.entity';

interface Props {
    time: string;
    accept: () => void;
    close: () => void;
}

const ModalWrapper = styled.div`
    padding: 10px;
    background: #afacac;
    width: 220px;
    position: absolute;
    z-index: 2;
    left: 50%;
    // Чтобы блок был по центру необходимо (width+padding)/2
    margin-left: -120px;
    margin-top: 5px;

    input {
        text-align: center;
        color: #fff;
        font-weight: 700;
        font-size: 18px;
    }
`;

export const CreateRental: React.FC<Props> = ({ time, close }) => {
    const ref = useRef();
    const [startTime, setStartTime] = useState<string>(time);
    const [finishTime, setFinishTime] = useState<string>();
    const [specialists, setSpecialists] = useState<LargeUser[]>()

    const onClickWithout = e => {
        // если клик вне окна то запускаем close()
        if (!e.path.includes(ref.current)) {
            close();
        }
    };

    useEffect(() => {
        // отлавливаем клик
        document.addEventListener('click', onClickWithout);

        let finishHours = time.split(':')[0];
        if (Number(finishHours) + 1 < 10) {
            finishHours = `0${Number(finishHours) + 1}`;
        } else {
            finishHours = `${Number(finishHours) + 1}`;
        }

        setFinishTime(`${finishHours}:00`);

        // удаляем отлавливальщика чтобы избежать утечки памяти
        return () => document.removeEventListener('click', onClickWithout);
    }, []);

    return (
        <ModalWrapper ref={ref}>
            <div style={{ marginBottom: 10 }}>
                <Typography color={'#fff'} fontSize={'18px'}>
                    Создание аренды
                </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TimePicker
                    value={startTime}
                    onValueChange={setStartTime}
                    width={100}
                    styles={{ backgroundColor: '#c5c5c5', height: 40 }}
                />
                <span style={{ color: '#fff', margin: '0 5px' }}>&mdash;</span>
                <TimePicker
                    value={finishTime}
                    onValueChange={setFinishTime}
                    width={100}
                    styles={{ backgroundColor: '#c5c5c5', height: 40 }}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                <Select placeholder={'Выберите арендатор'} width={220} />
            </div>
            <div style={{ marginTop: 10 }}>
                <Gapped gap={10}>
                    <Button use={'success'}>Сохранить</Button>
                    <Button>Отменить</Button>
                </Gapped>
            </div>
        </ModalWrapper>
    );
};
