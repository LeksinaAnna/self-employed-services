import React from 'react';
import { HomeOutlined, GroupsOutlined, EqualizerOutlined, EventNoteOutlined } from '@mui/icons-material';
import { ServiceMenuItem } from '../ServiceMenuItem/ServiceMenuItem';
import { MenuWrapper } from '../ServiceMenuPanel';

export const SpecialistMenu: React.FC = () => {
    return (
        <MenuWrapper>
            <ServiceMenuItem
                title={'Услуги'}
                to={'/services'}
                icon={<HomeOutlined color={'disabled'} fontSize={'large'} />}
            />
            <ServiceMenuItem
                title={'Клиенты'}
                to={'/clients'}
                icon={<GroupsOutlined color={'disabled'} fontSize={'large'} />}
            />
            <ServiceMenuItem
                title={'Отчёт'}
                to={'/report'}
                icon={<EqualizerOutlined color={'disabled'} fontSize={'large'} />}
            />
            <ServiceMenuItem
                title={'Записи'}
                to={'/records'}
                icon={<EventNoteOutlined color={'disabled'} fontSize={'large'} />}
            />
        </MenuWrapper>
    );
};