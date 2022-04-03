import React from 'react';
import { Gapped } from '@skbkontur/react-ui';
import { NavLink, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { darkBackground, secondaryText } from '../../../../../client-tools/styles/color';
import { Typography } from '../../../../ui/Text/Typography';

interface Props {
    title: string;
    icon: React.ReactNode;
    to?: string;
    action?: () => void;
}

const ItemWrapper = styled.div<{ active?: boolean }>(({ active }) => ({
    textAlign: 'center',
    padding: '5px 0',
    backgroundColor: active && darkBackground,
    borderBottom: `1px solid ${secondaryText}`,
    cursor: 'pointer',
    ['&:hover']: {
        backgroundColor: darkBackground,
    },
}));

export const ServiceMenuLink: React.FC<Props> = ({ title, icon, to }) => {
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

export const ServiceMenuButton: React.FC<Props> = ({ icon, title, action }) => (
    <ItemWrapper onClick={action}>
        <Gapped vertical gap={0} verticalAlign={'middle'}>
            <div>{icon}</div>
            <Typography fontSize={'18px'} color={secondaryText}>
                {title}
            </Typography>
        </Gapped>
    </ItemWrapper>
);
