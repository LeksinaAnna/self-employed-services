import React from 'react';
import { Button } from '@mui/material';
import { UseStores } from './client-tools/hooks/use-stores';

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
                phone: '+7-999-999-22-11'
            }
        })
    }
    return (
        <div>
            <h1>Hello World</h1>
            <Button variant={'outlined'} color={'primary'} onClick={registr}>
                Зарегаться
            </Button>
        </div>
    )
}
