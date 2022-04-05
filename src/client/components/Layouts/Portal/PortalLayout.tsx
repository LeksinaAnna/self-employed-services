import React from 'react';
import { Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { defaultPortalColor } from '../../../client-tools/styles/color';
import { useStores } from '../../../client-tools/hooks/use-stores';
import { LoginModal } from '../../entities/Auth/modals/LoginModal';
import { RegistrationModal } from '../../entities/Auth/modals/RegistrationModal';
import { LoadingLayout } from '../LoadingLoyaout/LoadingLayout';
import { ServiceMenuPanel } from './ServiceMenuPanel/ServiceMenuPanel';
import { PortalHeader } from './Head/PortalHeader';

export const APP_HEIGHT = '500px';

const LayoutContainer = styled.div`
    width: 1000px;
    margin: 50px 250px;
    padding: 15px;
`;

const ContentBlockWrapper = styled.div`
    padding: 14px 24px;
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
    const { authStore, appStore } = useStores();
    const { isLoginModal, isRegistrationModal, isLoading } = authStore;
    return (
        <LoadingLayout isLoading={appStore.isLoading}>
            <LayoutContainer>
                <PortalHeader />
                <BodyWrapper>
                    {/* Меню слева */}
                    <ServiceMenuPanel />

                    {/* Контент посередине */}
                    <ContentBlockWrapper>
                        {children}
                    </ContentBlockWrapper>
                </BodyWrapper>
                {isLoginModal && <LoginModal />}
                {isRegistrationModal && <RegistrationModal />}
            </LayoutContainer>
        </LoadingLayout>
    );
};
