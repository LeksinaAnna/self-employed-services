import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { EditOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';

interface Props {
    title: string;
    price: number;
    openSettings?: () => void;
}

const InfoButton = styled(EditOutlined)`
    font-size: 18px;

    &:hover {
        cursor: pointer;
    }
`;

export const CalendarTitle: React.FC<Props> = ({ title, price, openSettings }) => (
    <div>
        <Gapped gap={30}>
            <Gapped gap={4}>
                <Typography fontSize={'20px'} color={secondaryText}>
                    {title}
                </Typography>
                {openSettings && (
                    <Typography>
                        <InfoButton color="primary" onClick={openSettings} />
                    </Typography>
                )}
            </Gapped>
            <Typography fontSize={'20px'} color={secondaryText}>
                {price} р/ч
            </Typography>
        </Gapped>
    </div>
);
