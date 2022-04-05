import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

interface Props {
    children?: React.ReactNode;
}

const TopBarWrapper = styled.div`
    height: 40px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
`;

export const TopBarContainer: React.FC<Props> = ({ children }) => (
    <TopBarWrapper>
        <Box>{children}</Box>
    </TopBarWrapper>
);
