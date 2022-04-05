import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Gapped, Input } from '@skbkontur/react-ui';
import { SpaceBetweenContainer } from '../../ui/Containers/SpaceBetweenContainer';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';

export const HeadLocations = () => {
    return (
        <SpaceBetweenContainer align={'center'}>
            <Gapped gap={40} verticalAlign={'middle'}>
                <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                    Локации
                </Typography>
                <Button startIcon={<AddIcon />} variant={'contained'} color="inherit">
                    Добавить
                </Button>
            </Gapped>
            <Input width={300} placeholder="Поиск локаций" rightIcon={<SearchIcon color="action" style={{ marginTop: '5px' }} />} />
        </SpaceBetweenContainer>
    );
};
