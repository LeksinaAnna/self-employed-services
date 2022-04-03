import React from 'react';
import { AccountCircleOutlined, AppRegistrationOutlined } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { MenuWrapper } from '../ServiceMenuPanel';
import { ServiceMenuButton } from '../ServiceMenuItems/ServiceMenuItems';
import { useStores } from '../../../../../client-tools/hooks/use-stores';

export const DefaultMenu: React.FC = observer(() => {
    const { authStore } = useStores();
    const { service } = authStore;

    return (
        <MenuWrapper>
            <ServiceMenuButton
                title={'Войти'}
                icon={<AccountCircleOutlined color={'disabled'} fontSize={'large'} />}
                action={service.openLoginModal}
            />
            <ServiceMenuButton
                title={'Регистрация'}
                icon={<AppRegistrationOutlined color={'disabled'} fontSize={'large'} />}
                action={service.openRegistrationModal}
            />
        </MenuWrapper>
    );
});
