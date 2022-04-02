import React from 'react';
import { Property } from 'csstype';
import { styled } from '@mui/material';

interface Props {
    align: Property.AlignItems;
}

export const SpaceBetweenContainer = styled(`div`)<Props>(({ align }) => ({
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: align,
}));