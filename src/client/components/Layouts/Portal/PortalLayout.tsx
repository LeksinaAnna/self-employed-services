import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { APP_MIN_HEIGHT } from '../../../../common/enviroments/global-enviroment';
import { defaultPortalColor } from '../../../client-tools/styles/color';
import { ServiceMenuPanel } from './ServiceMenuPanel/ServiceMenuPanel';
import { PortalHeader } from './Head/PortalHeader';

const ContentBlockWrapper = styled.div`
    padding: 34px 24px;
    width: 890px;
    min-height: 75vh;
`;

const BodyWrapper = styled.div`
    display: flex;
    box-shadow: 0 0 0 2px ${defaultPortalColor};
    padding: 0;
    min-height: ${APP_MIN_HEIGHT};
`;

/**
 *
 * Обертка над всем приложением
 *
 * @constructor
 */
export const PortalLayout: React.FC = () => (
    <div>
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
    </div>
);
