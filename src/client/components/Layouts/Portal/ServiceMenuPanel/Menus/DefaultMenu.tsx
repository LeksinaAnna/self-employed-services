import React from 'react';
import { AccountCircleOutlined, AppRegistrationOutlined } from '@mui/icons-material';
import { MenuWrapper } from '../ServiceMenuPanel';
import { ServiceMenuLink } from '../ServiceMenuItems/ServiceMenuItems';

export const DefaultMenu: React.FC = () => (
    <MenuWrapper>
        <ServiceMenuLink
            title={'Войти'}
            icon={<AccountCircleOutlined color={'disabled'} fontSize={'large'} />}
            to={'/login'}
        />
        <ServiceMenuLink
            title={'Регистрация'}
            icon={<AppRegistrationOutlined color={'disabled'} fontSize={'large'} />}
            to={'/registration'}
        />
    </MenuWrapper>
);
