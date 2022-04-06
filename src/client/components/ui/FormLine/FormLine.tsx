import React from 'react';
import styled from '@emotion/styled';
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

const TextWrapper = styled.div`
  color: ${secondaryText};
  width: 150px;
  font-size: 16px;
`;

export const FormLine: React.FC<Props> = ({ vertical, children, caption }) => (
    <LineContainer vertical={vertical}>
        {caption && <TextWrapper color={secondaryText}>{caption}</TextWrapper>}
        {children}
    </LineContainer>
);