import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { Box, Tooltip } from '@mui/material';
import { PersonOutline, SettingsOutlined } from '@mui/icons-material';

export const TopBar: React.FC = () => {
    return (
        <Box>
            <Gapped gap={20} verticalAlign={'middle'}>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <Tooltip title={'Зарегистрироваться'}>
                        <PersonOutline fontSize={'large'} color={'disabled'} />
                    </Tooltip>
                </Gapped>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <Tooltip title={'Настройки'}>
                        <SettingsOutlined fontSize={'large'} color={'disabled'} />
                    </Tooltip>
                </Gapped>
            </Gapped>
        </Box>
    );
};