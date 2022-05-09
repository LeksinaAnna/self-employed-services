import React from 'react';
import styled from '@emotion/styled';

interface Props {
    children: React.ReactNode;
    marginTop?: number | string;
}

const BackgroundFragment = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
`;

const ContainerWrapper = styled.div`
    position: relative;
    text-align: center;
    height: 100%;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 10;
    display: inline-block;
    text-align: left;
    vertical-align: middle;
    margin: 0 20px 40px 20px;
`;

export const BackgroundContainer: React.FC<Props> = ({ children, marginTop = 40 }) => (
    <div style={{ height: '100%', width: '100%', left: 0, top: 0, position: 'fixed', zIndex: 1400 }}>
        <BackgroundFragment />
        <ContainerWrapper>
            <ContentWrapper style={{ marginTop }}>{children}</ContentWrapper>
        </ContainerWrapper>
    </div>
);
