import React from 'react';
import { HomeOutlined } from '@mui/icons-material';
import { ServiceMenuItem } from '../ServiceMenuItem/ServiceMenuItem';
import { MenuWrapper } from '../ServiceMenuPanel';

export const AdminMenu = () => {
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
