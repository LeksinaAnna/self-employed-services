import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { secondaryText } from '../../../client-tools/styles/color';

interface Props {
    vertical?: boolean;
    children: React.ReactNode;
    caption: string;
}

const LineContainer = styled.div<{ vertical?: boolean }>(({ vertical }) => ({
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    alignItems: !vertical ? 'center' : 'start'
}));

export const FormLine: React.FC<Props> = ({ vertical, children, caption }) => (
    <LineContainer vertical={vertical}>
        {caption && <Typography color={secondaryText} fontSize='16px' width='150px'>{caption}</Typography>}
        <div style={{ maxWidth: 250 }}>
            {children}
        </div>
    </LineContainer>
);