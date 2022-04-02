import React from 'react';
import { LinearProgress } from '@mui/material';

interface Props {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoadingLayout: React.FC<Props> = ({ isLoading, children }) => {
    return (
        <React.Fragment>
            {isLoading && <LinearProgress sx={{ color: 'grey.500' }} color='inherit' />}
            {children}
        </React.Fragment>
    )
};