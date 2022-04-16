import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Gapped, Input } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';
import { SpaceBetweenContainer } from '../../ui/Containers/SpaceBetweenContainer';

interface Props {
    searchValue: string;
    onValueChange: (value: string) => void;
    openModal: () => void;
}

export const ServicesHead: React.FC<Props> = ({ searchValue, onValueChange, openModal }) => (
    <SpaceBetweenContainer align={'center'}>
        <Gapped gap={40} verticalAlign={'middle'}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Услуги
            </Typography>
            <Button onClick={openModal} startIcon={<AddIcon />} variant={'contained'} color="inherit">
                Добавить
            </Button>
        </Gapped>
        <Input
            width={300}
            value={searchValue}
            onValueChange={onValueChange}
            placeholder="Поиск по услугам"
            rightIcon={<SearchIcon color="action" style={{ marginTop: '5px' }} />}
        />
    </SpaceBetweenContainer>
);
