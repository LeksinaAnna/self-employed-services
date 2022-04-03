import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { secondaryText } from '../../../client-tools/styles/color';
import { Typography } from '../Text/Typography';

interface Props {
    gap?: number;
    vertical?: boolean;
    children: React.ReactNode;
    caption: string;
}

export const FormLine: React.FC<Props> = ({ gap = 5, vertical, children, caption }) => (
    <Gapped gap={gap} vertical={vertical}>
        <Typography color={secondaryText}>{caption}</Typography>
        {children}
    </Gapped>
);