import React from 'react';
import styled from '@emotion/styled';
import { Hint } from '@skbkontur/react-ui';
import { LargeRoom, RoomId } from '../../../../../../server/modules/domains/rooms/entities/room.entity';
import {
    greenText,
    hoveredColor,
    notActiveText,
    orangeText,
    secondaryText,
} from '../../../../../client-tools/styles/color';
import { Typography } from '../../../../ui/Text/Typography';
import { professionTypeDict } from '../../../../../../server/modules/domains/users/entities/user-profile.entity';

interface Props {
    item: LargeRoom;
    changeRoom: (roomId: RoomId) => void;
}

const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 5px;
    border-bottom: 1px solid ${notActiveText};
    border-top: 1px solid ${notActiveText};

    &:hover {
        cursor: pointer;
        background: ${hoveredColor};
    }
`;

export const RoomItem: React.FC<Props> = ({ item, changeRoom }) => (
        <Hint text={'Нажмите чтобы выбрать'}>
            <ItemWrapper onClick={() => changeRoom(item.roomId)}>
                <Typography fontSize="18px" color={secondaryText}>
                    {item.title}
                </Typography>
                <Typography fontSize="18px" color={greenText}>
                    {item.price} руб/ч
                </Typography>
                <Typography fontSize="18px" color={orangeText}>
                    {professionTypeDict[item.type]}
                </Typography>
                <Typography fontSize="14px" color={secondaryText}>
                    {item.description}
                </Typography>
            </ItemWrapper>
        </Hint>
    );
