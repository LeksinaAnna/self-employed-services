import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { PersonOutline, SettingsOutlined } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { TopBarContainer } from '../../../../ui/Containers/TopBarContainer';

export const TopBarIsAuth: React.FC = observer(() => {
    const { authStore } = useStores();
    const { setIsLoginModal } = authStore;

    return (
        <TopBarContainer>
            <Gapped gap={20} verticalAlign={'middle'}>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <PersonOutline fontSize={'large'} color={'disabled'} onClick={() => setIsLoginModal(true)} />
                </Gapped>
                <Gapped gap={3} verticalAlign={'middle'}>
                    <SettingsOutlined fontSize={'large'} color={'disabled'} />
                </Gapped>
            </Gapped>
        </TopBarContainer>
    );
});
