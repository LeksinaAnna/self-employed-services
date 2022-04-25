import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { Typography } from '../../ui/Text/Typography';
import { secondaryText } from '../../../client-tools/styles/color';
import { SpaceBetweenContainer } from '../../ui/Containers/SpaceBetweenContainer';

export const RecordsPageHead = () => (
    <SpaceBetweenContainer align={'center'}>
        <Gapped gap={40} verticalAlign={'middle'}>
            <Typography color={secondaryText} fontSize="34px" fontWeight={700}>
                Загруженность аренды
            </Typography>
        </Gapped>
    </SpaceBetweenContainer>
);
