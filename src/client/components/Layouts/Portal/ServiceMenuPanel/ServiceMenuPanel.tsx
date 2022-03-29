import React from 'react';
import { HomeOutlined } from '@mui/icons-material';
import styled from '@emotion/styled';
import { defaultPortalColor } from '../../../../client-tools/styles/color';
import { ServiceMenuItem } from './ServiceMenuItem/ServiceMenuItem';

const MenuWrapper = styled.div`
  width: 100px;
  border-right: 1px solid ${defaultPortalColor};
  background-color: #dcdbdb;
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
