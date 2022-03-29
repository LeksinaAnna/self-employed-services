import React from 'react';
import styled from '@emotion/styled';
import { TopBar } from './TopBar';
import { ServiceMenuPanel } from './ServiceMenuPanel/ServiceMenuPanel';
import { defaultPortalColor } from '../../../client-tools/styles/color';

export const APP_HEIGHT = '500px';

const LayoutContainer = styled.div`
    width: 1000px;
    margin: 50px 250px;
    padding: 15px;
`;

interface Props {
    children: React.ReactNode;
}

export const PortalLayout: React.FC<Props> = ({ children }) => {
    return (
        <LayoutContainer>
            <TopBar />
            <div style={{ display: 'flex', position: 'relative', border: `1px solid ${defaultPortalColor}`, height: APP_HEIGHT }}>
                <ServiceMenuPanel />
                <div style={{ width: 910}}>
                    Контент контейнер
                    {children}
                </div>
            </div>
        </LayoutContainer>
    );
};
