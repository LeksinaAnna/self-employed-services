import React from 'react';
import styled from '@emotion/styled';
import { secondaryText } from '../../../client-tools/styles/color';

interface Props {
    gap?: number;
    vertical?: boolean;
    children: React.ReactNode;
    caption: string;
}

const LineContainer = styled.div<{ vertical?: boolean }>(({ vertical }) => ({
    display: 'flex',
    flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center'
}));

const TextWrapper = styled.div`
  color: ${secondaryText};
  width: 150px;
  font-size: 16px;
`;

export const FormLine: React.FC<Props> = ({ gap = 5, vertical, children, caption }) => (
    <LineContainer vertical={vertical}>
        {caption && <TextWrapper color={secondaryText}>{caption}</TextWrapper>}
        {children}
    </LineContainer>
);