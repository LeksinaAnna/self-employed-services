import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { darkBackground, secondaryText } from '../../../../../client-tools/styles/color';
import { Typography } from '../../../../ui/Text/Typography';

interface Props {
    title: string;
    icon: React.ReactNode;
    to: string;
}

const ItemWrapper = styled.div<{active: boolean}>(({ active }) => ({
    textAlign: 'center',
    padding: 5,
    backgroundColor: active && darkBackground,
    borderBottom: `1px solid ${secondaryText}`,
    ['&:hover']: {
        backgroundColor: darkBackground,
    },
}));

export const ServiceMenuItem: React.FC<Props> = ({ title, icon, to }) => {
    const locationHook = useLocation();

    return (
        <ItemWrapper active={locationHook.pathname === to}>
            <NavLink style={{ textDecoration: 'none', color: secondaryText }} to={to}>
                <div>{icon}</div>
                <Typography fontSize={'18px'}>{title}</Typography>
            </NavLink>
        </ItemWrapper>
    );
};
