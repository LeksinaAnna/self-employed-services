import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { Typography } from '../../../ui/Text/Typography';
import { secondaryText } from '../../../../client-tools/styles/color';

interface Props {
    title: string;
    price: number;
}

export const TitleItem: React.FC<Props> = ({ title, price }) => (
    <div>
        <Gapped gap={30}>
            <Typography fontSize={'20px'} color={secondaryText}>
                {title}
            </Typography>
            <Typography fontSize={'20px'} color={secondaryText}>
                {price} р/ч
            </Typography>
        </Gapped>
    </div>
);
