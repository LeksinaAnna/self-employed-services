import React from 'react';
import { ApiError } from '../../../client-tools/api/api-client/api-error';
import { ErrorModal } from '../../ui/Modals/ErrorModal';

interface State {
    error?: ApiError | Error;
    errorInfo?: React.ErrorInfo;
    location?: string;
}

interface Props {
    children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
    public state = {
        error: undefined,
        errorInfo: undefined,
        location: undefined,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({
            error,
            errorInfo,
            location: window.location.pathname,
        });
    }

    public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (prevState.location && prevState.location !== window.location.pathname) {
            this.setState({
                error: undefined,
                errorInfo: undefined,
                location: undefined,
            });
        }
    }

    public renderError(error: ApiError | undefined): React.ReactNode | undefined {
        const errorCode = error?.statusCode;
        switch (errorCode) {
            case 400:
                // Непревидька
                return (
                    <ErrorModal
                        errorMessage={`Непредвиденная ошибка ${error.message}`}
                        onClose={() => location.reload()}
                        buttonTitle={'Перезагрузить'}
                    />
                );

            case 401:
                return (
                    <ErrorModal
                        errorMessage={`Вы не авторизованы: ${error.message}`}
                        onClose={() => location.replace('/login')}
                        buttonTitle={'Войти'}
                    />
                );

            case 403:
                // Нет доступа к ресурсу
                return (
                    <ErrorModal
                        errorMessage={`Нет доступа ${error.message}`}
                        onClose={() => location.replace('/')}
                        buttonTitle={'На главную'}
                    />
                );

            case 404:
                // Страница не найдена
                return (
                    <ErrorModal
                        errorMessage={`Not found ${error.message}`}
                        onClose={() => location.replace('/')}
                        buttonTitle={'На главную'}
                    />
                );

            case 500:
                // Непредвидька
                return (
                    <ErrorModal
                        errorMessage={`Серверная ошибка: ${error.message}`}
                        onClose={() => location.reload()}
                        buttonTitle={'Перезагрузить'}
                    />
                );

            default:
                // Тоже непредвидька
                return (
                    <ErrorModal
                        errorMessage={`Серверная ошибка: ${error.message}`}
                        onClose={() => location.reload()}
                        buttonTitle={'Перезагрузить'}
                    />
                );
        }
    }

    public render(): React.ReactNode | undefined {
        if (this.state.error !== undefined) {
            return this.renderError(this.state.error);
        }
        return this.props.children;
    }
}
