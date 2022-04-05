import React from 'react';
import styled from '@emotion/styled';

interface Props {
    children: React.ReactNode;
}

const BackgroundFragment = styled.div`
    position: absolute;
    background: #222;
    opacity: 0.6;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
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
  margin: 40px 20px;
`;

export const BackgroundContainer: React.FC<Props> = ({ children }) => (
    <div style={{ height: '100%', width: '100%', left: 0, top: 0, position: 'fixed' }}>
        <BackgroundFragment />
        <ContainerWrapper>
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </ContainerWrapper>
    </div>
);