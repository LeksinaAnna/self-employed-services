import React from 'react';
import { Grid, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import {
    defaultPortalColor,
    hoveredColor,
    lightBackground,
    secondaryText,
} from '../../../../client-tools/styles/color';

interface Props {
    time: string;
    selectedTime: string;
    onSelect: () => void;
    disabled: boolean;
}

const ItemWrapper = styled.div<{ isDisabled: boolean }>(({ isDisabled }) => ({
    position: 'relative',
    height: '40px',
    display: 'flex',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    ...(!isDisabled && {
        border: `1px solid ${defaultPortalColor}`,
        [':hover']: {
            cursor: 'pointer',
            background: hoveredColor,
        },
    }),
    ...(isDisabled && {
        background: lightBackground,
    }),
}));

const SelectedIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`;

export const TimeItem: React.FC<Props> = observer(({ selectedTime, time, onSelect, disabled }) => (
    <Grid item xs={2.4} key={time}>
        <ItemWrapper isDisabled={disabled} onClick={!disabled ? onSelect : null}>
            <Typography fontSize="18px" color={secondaryText}>
                {time}
            </Typography>
            {selectedTime === time && (
                <SelectedIcon>
                    <DoneOutlineIcon color={'success'} fontSize='small' />
                </SelectedIcon>
            )}
        </ItemWrapper>
    </Grid>
));
