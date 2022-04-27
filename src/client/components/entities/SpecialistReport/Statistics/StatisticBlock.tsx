import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { defaultPortalColor, secondaryText } from '../../../../client-tools/styles/color';
import { Typography } from '../../../ui/Text/Typography';

interface Props {
    topTitle: string;
    topValue: number | string;
    bottomTitle: string;
    bottomValue: number | string;
}

export const StatisticBlock: React.FC<Props> = ({ bottomValue, bottomTitle, topValue, topTitle }) => (
    <div style={{ width: 290, border: `2px solid ${defaultPortalColor}`, padding: 10 }}>
        <Gapped gap={40}>
            <Typography color={secondaryText} fontSize="20px">
                {topTitle}
            </Typography>
            <Typography color={secondaryText} fontSize="20px">
                {topValue}
            </Typography>
        </Gapped>
        <Gapped gap={40}>
            <Typography color={secondaryText} fontSize="30px">
                {bottomTitle}
            </Typography>
            <Typography color={secondaryText} fontSize="30px">
                {bottomValue}
            </Typography>
        </Gapped>
    </div>
);
