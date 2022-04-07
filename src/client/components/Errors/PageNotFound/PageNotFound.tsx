import React from 'react';
import { Center } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';

export const PageNotFound: React.FC = () => (
    <Center>
        <Typography color={secondaryText} fontSize={'34px'}>
            Страница не найдена
        </Typography>
    </Center>
);