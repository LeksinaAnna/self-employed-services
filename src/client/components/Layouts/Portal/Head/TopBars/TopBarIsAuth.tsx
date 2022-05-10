import React from 'react';
import { DropdownMenu, Gapped, MenuItem } from '@skbkontur/react-ui';
import { PersonOutline } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStores } from '../../../../../client-tools/hooks/use-stores';
import { TopBarContainer } from '../../../../ui/Containers/TopBarContainer';
import { Typography } from '../../../../ui/Text/Typography';
import { notActiveText } from '../../../../../client-tools/styles/color';

export const TopBarIsAuth: React.FC = observer(() => {
    const { authStore, appStore } = useStores();
    const { service, redirectPath } = authStore;
    
    const navigate = useNavigate();


    return (
        <TopBarContainer>
            <Gapped gap={10} verticalAlign={'middle'}>
                <DropdownMenu
                    menuWidth={90}
                    caption={<PersonOutline sx={{ color: notActiveText, cursor: 'pointer' }} fontSize={'large'} />}
                >
                    <MenuItem onClick={() => navigate('/')}>Главная</MenuItem>
                    <MenuItem onClick={() => navigate(redirectPath)}>Личный кабинет</MenuItem>
                    <MenuItem onClick={service.logout}>Выйти</MenuItem>
                </DropdownMenu>
                <Typography color={notActiveText} fontSize={'20px'}>
                    {appStore.userData?.profile?.fullName}
                </Typography>
            </Gapped>
        </TopBarContainer>
    );
});
