import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { APP_MIN_HEIGHT } from '../../../../common/enviroments/global-enviroment';
import { defaultPortalColor } from '../../../client-tools/styles/color';
import { ServiceMenuPanel } from './ServiceMenuPanel/ServiceMenuPanel';
import { PortalHeader } from './Head/PortalHeader';

const LayoutContainer = styled.div`
    width: 1000px;
    padding: 65px 265px;
`;

const ContentBlockWrapper = styled.div`
    padding: 34px 24px;
    width: 890px;
`;

const BodyWrapper = styled.div`
    display: flex;
    border: 1px solid ${defaultPortalColor};
    min-height: ${APP_MIN_HEIGHT};
`;

/**
 *
 * Обертка над всем приложением
 *
 * @constructor
 */
export const PortalLayout: React.FC = () => (
    <LayoutContainer>
        {/* Меню сверху/TopBar */}
        <PortalHeader />

        <BodyWrapper>
            {/* Меню слева */}
            <ServiceMenuPanel />

            {/* Контент посередине */}
            <ContentBlockWrapper>
                <Outlet />
            </ContentBlockWrapper>
        </BodyWrapper>
    </LayoutContainer>
);
