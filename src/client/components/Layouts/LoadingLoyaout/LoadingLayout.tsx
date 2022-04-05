import React from 'react';
import { LinearProgress } from '@mui/material';

interface Props {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoadingLayout: React.FC<Props> = ({ isLoading, children }) => (
    <div style={{ position: 'relative' }}>
        {isLoading && (
            <LinearProgress
                sx={{ color: 'grey.500', position: 'absolute', top: -30, right: 0, bottom: 0, left: 0 }}
                color="inherit"
            />
        )}
        {children}
    </div>
);
