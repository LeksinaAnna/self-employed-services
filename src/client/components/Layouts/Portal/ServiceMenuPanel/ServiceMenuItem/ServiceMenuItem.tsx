import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

interface Props {
    title: string;
    icon: React.ReactNode;
    to: string;
}

const ItemWrapper = styled.div<{active: boolean}>(({ active }) => ({
    textDecoration: 'none',
    textAlign: 'center',
    padding: 5,
    backgroundColor: active && '#b7b7b7',
    ['&:hover']: {
        backgroundColor: '#b7b7b7',
    },
}));

export const ServiceMenuItem: React.FC<Props> = ({ title, icon, to }) => {
    const locationHook = useLocation();

    return (
        <ItemWrapper active={locationHook.pathname === to}>
            <NavLink to={to}>
                <div>{icon}</div>
                <div>{title}</div>
            </NavLink>
        </ItemWrapper>
    );
};
