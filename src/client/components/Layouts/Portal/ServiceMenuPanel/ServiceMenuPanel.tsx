import React from 'react';
import { HomeOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { defaultPortalColor } from '../../../../client-tools/styles/color';
import { APP_HEIGHT } from '../PortalLayout';
import { ServiceMenuItem } from './ServiceMenuItem/ServiceMenuItem';

const MenuWrapper = styled.div`
    width: 100px;
    padding: 10px;
    border-right: 1px solid ${defaultPortalColor};
`;

export const ServiceMenuPanel: React.FC = () => {
    return (
        <MenuWrapper>
            <ServiceMenuItem
                title={'Локации'}
                to={'/locations'}
                icon={<HomeOutlined color={'disabled'} fontSize={'large'} />}
            />
        </MenuWrapper>
    );
};
