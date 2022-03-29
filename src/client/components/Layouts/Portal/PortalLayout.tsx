import React from 'react';
import styled from '@emotion/styled';
import { defaultPortalColor } from '../../../client-tools/styles/color';
import { TopBar } from './TopBar';
import { ServiceMenuPanel } from './ServiceMenuPanel/ServiceMenuPanel';

export const APP_HEIGHT = '500px';

const LayoutContainer = styled.div`
    width: 1000px;
    margin: 50px 250px;
    padding: 15px;
`;

const ContentBlockWrapper = styled.div`
    width: 890px;
`;

const BodyWrapper = styled.div`
    display: flex;
    border: 1px solid ${defaultPortalColor};
    height: ${APP_HEIGHT};
`;

interface Props {
    children: React.ReactNode;
}

export const PortalLayout: React.FC<Props> = ({ children }) => {
    return (
        <LayoutContainer>
            <TopBar />
            <BodyWrapper>
                {/* Меню слева */}
                <ServiceMenuPanel />

                {/* Контент посередине */}
                <ContentBlockWrapper>
                    Контент контейнер
                    {children}
                </ContentBlockWrapper>
            </BodyWrapper>
        </LayoutContainer>
    );
};
