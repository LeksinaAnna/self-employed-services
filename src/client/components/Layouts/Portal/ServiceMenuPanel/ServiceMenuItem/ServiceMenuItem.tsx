import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
    title: string;
    icon: React.ReactNode;
    to: string;
}

export const ServiceMenuItem: React.FC<Props> = ({ title, icon, to }) => {
    return (
        <NavLink to={to}>
            <div>{icon}</div>
            <div>{title}</div>
        </NavLink>
    );
};