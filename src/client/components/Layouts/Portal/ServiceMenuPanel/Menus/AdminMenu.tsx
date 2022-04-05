import React from 'react';
import { EqualizerOutlined, GroupsOutlined, HomeOutlined } from '@mui/icons-material';
import { ServiceMenuLink } from '../ServiceMenuItems/ServiceMenuItems';
import { MenuWrapper } from '../ServiceMenuPanel';

export const AdminMenu = () => (
    <MenuWrapper>
        <ServiceMenuLink
            title={'Локации'}
            to={'locations'}
            icon={<HomeOutlined color={'disabled'} fontSize={'large'} />}
        />
        <ServiceMenuLink
            title={'Арендаторы'}
            to={'tenantry'}
            icon={<GroupsOutlined color={'disabled'} fontSize={'large'} />}
        />
        <ServiceMenuLink
            title={'Отчёт'}
            to={'report'}
            icon={<EqualizerOutlined color={'disabled'} fontSize={'large'} />}
        />
    </MenuWrapper>
);
