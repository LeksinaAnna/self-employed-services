import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';
import { SpaceBetweenContainer } from '../../ui/Containers/SpaceBetweenContainer';

interface Props {
    searchValue: string;
    onValueChange: (value: string) => void;
}

export const ServicesHead: React.FC<Props> = ({ searchValue, onValueChange }) => (
    <SpaceBetweenContainer align={'center'}>
        <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
            Услуги
        </Typography>
        <Input
            width={300}
            value={searchValue}
            onValueChange={onValueChange}
            placeholder="Поиск по услугам"
            rightIcon={<SearchIcon color="action" style={{ marginTop: '5px' }} />}
        />
    </SpaceBetweenContainer>
);
