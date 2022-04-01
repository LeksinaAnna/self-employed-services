import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { Box } from '@mui/material';
import { PersonOutline, SettingsOutlined } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../client-tools/hooks/use-stores';

export const TopBar: React.FC = observer(() => {
    const { authStore } = useStores();
    const { setIsLoginModal } = authStore;

    return (
        <Box>
            <Gapped gap={20} verticalAlign={'middle'}>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <PersonOutline fontSize={'large'} color={'disabled'} onClick={() => setIsLoginModal(true)} />
                </Gapped>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <SettingsOutlined fontSize={'large'} color={'disabled'} />
                </Gapped>
            </Gapped>
        </Box>
    );
});
