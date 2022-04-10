import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Gapped, Input } from '@skbkontur/react-ui';
import { SpaceBetweenContainer } from '../../ui/Containers/SpaceBetweenContainer';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';

interface Props {
    openModal: () => void;
    isModal: boolean;
    value: string;
    onValueChange: (value: string) => void;
}

export const HeadLocations: React.FC<Props> = ({ openModal, isModal, value, onValueChange }) => (
    <SpaceBetweenContainer align={'center'}>
        <Gapped gap={40} verticalAlign={'middle'}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Локации
            </Typography>
            <Button onClick={openModal} startIcon={<AddIcon />} variant={'contained'} color="inherit">
                Добавить
            </Button>
        </Gapped>
        <Input
            width={300}
            value={value}
            onValueChange={onValueChange}
            placeholder="Поиск локаций"
            rightIcon={<SearchIcon color="action" style={{ marginTop: '5px' }} />}
            disabled={isModal}
        />
    </SpaceBetweenContainer>
);
