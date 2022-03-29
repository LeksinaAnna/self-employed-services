import styled from '@emotion/styled';
import React from 'react';
import { PersonOutline, SettingsOutlined } from '@mui/icons-material';
import { Gapped } from '@skbkontur/react-ui';
import { AppBar, Box, Button, Container, Toolbar, Tooltip } from '@mui/material';
import { UseStores } from './client-tools/hooks/use-stores';
import { PortalLayout } from './components/Layouts/Portal/PortalLayout';

export const App: React.FC = () => {
    const { commonApi } = UseStores();
    const { auth } = commonApi;

    const registr = async () => {
        await auth.registration({
            email: 'fclans@yandex.ru',
            password: '123456',
            fullName: 'Антошка картошка',
            profession: 'barber',
            role: 'SPECIALIST',
            contacts: {
                email: 'fclans@yandex.ru',
                vk: '',
                instagram: '',
                phone: '+7-999-999-22-11',
            },
        });
    };
    return (
        <PortalLayout>

        </PortalLayout>
    );
};
