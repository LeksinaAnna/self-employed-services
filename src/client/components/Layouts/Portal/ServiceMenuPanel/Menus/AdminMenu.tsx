import React from 'react';
import { HomeOutlined } from '@mui/icons-material';
import { ServiceMenuLink } from '../ServiceMenuItems/ServiceMenuItems';
import { MenuWrapper } from '../ServiceMenuPanel';

export const AdminMenu = () => (
    <MenuWrapper>
        <ServiceMenuLink
            title={'Локации'}
            to={'/locations'}
            icon={<HomeOutlined color={'disabled'} fontSize={'large'} />}
        />
    </MenuWrapper>
);
