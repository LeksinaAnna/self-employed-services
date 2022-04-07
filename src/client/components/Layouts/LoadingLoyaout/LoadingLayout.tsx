import React from 'react';
import { LinearProgress } from '@mui/material';

interface Props {
    isLoading: boolean;
    isInit: boolean;
    children: React.ReactNode;
}

/**
 *
 * Глобальный компонент загрузки. Рисует "детей" только в случае когда приложение проинициализировано.
 *
 * @param isLoading - происходит ли какая-то загрузка\получение данных
 * @param children - Компоненты-дети
 * @param isInit - Проинициализировано ли приложение
 * @constructor
 */
export const LoadingLayout: React.FC<Props> = ({ isLoading, children, isInit }) => {
    // Условие отображения лоадера
    const isLoader = !isInit || isLoading;

    return (
        <div style={{ position: 'relative' }}>
            {isLoader && (
                <LinearProgress
                    sx={{ color: 'grey.500', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                    color="inherit"
                />
            )}
            {isInit && children}
        </div>
    );
};
