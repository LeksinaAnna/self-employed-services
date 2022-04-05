import React from 'react';
import { DropdownMenu, Gapped, MenuItem } from '@skbkontur/react-ui';
import { PersonOutline } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { TopBarContainer } from '../../../../ui/Containers/TopBarContainer';
import { Typography } from '../../../../ui/Text/Typography';
import { notActiveText } from '../../../../../client-tools/styles/color';

export const TopBarIsAuth: React.FC = observer(() => {
    const { authStore, appStore } = useStores();
    const { service } = authStore;

    return (
        <TopBarContainer>
            <Gapped gap={10} verticalAlign={'middle'}>
                <DropdownMenu
                    menuWidth={90}
                    caption={<PersonOutline sx={{ color: notActiveText, cursor: 'pointer' }} fontSize={'large'} />}
                >
                    <MenuItem>Профиль</MenuItem>
                    <MenuItem>Настройки</MenuItem>
                    <MenuItem onClick={service.logout}>Выйти</MenuItem>
                </DropdownMenu>
                <Typography color={notActiveText} fontSize={'20px'}>
                    {appStore.userData?.profile?.fullName}
                </Typography>
            </Gapped>
        </TopBarContainer>
    );
});
