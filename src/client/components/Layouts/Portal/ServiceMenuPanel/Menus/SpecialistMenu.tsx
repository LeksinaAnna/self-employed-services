import React from 'react';
import { HomeOutlined, GroupsOutlined, EqualizerOutlined, EventNoteOutlined } from '@mui/icons-material';
import { ServiceMenuLink } from '../ServiceMenuItems/ServiceMenuItems';
import { MenuWrapper } from '../ServiceMenuPanel';

export const SpecialistMenu: React.FC = () => (
    <MenuWrapper>
        <ServiceMenuLink
            title={'Услуги'}
            to={'services'}
            icon={<HomeOutlined color={'disabled'} fontSize={'large'} />}
        />
        <ServiceMenuLink
            title={'Клиенты'}
            to={'clients'}
            icon={<GroupsOutlined color={'disabled'} fontSize={'large'} />}
        />
        <ServiceMenuLink
            title={'Отчёт'}
            to={'report'}
            icon={<EqualizerOutlined color={'disabled'} fontSize={'large'} />}
        />
        <ServiceMenuLink
            title={'Записи'}
            to={'records'}
            icon={<EventNoteOutlined color={'disabled'} fontSize={'large'} />}
        />
    </MenuWrapper>
);
