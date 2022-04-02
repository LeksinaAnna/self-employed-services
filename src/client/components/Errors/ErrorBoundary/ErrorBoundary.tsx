import React from 'react';
import { Toast } from '@skbkontur/react-ui';
import { ApiError } from '../../../client-tools/api/api-client/api-error';

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
    }
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
                    <h1>ОШИБКА 400</h1>
                );

            case 401:
                break;

            case 403:
                // Нет доступа к ресурсу
                return (
                    <></>
                );

            case 404:
                // Страница не найдена
                return <></>;

            case 500:
                // Непредвидька
                return (
                    <></>
                );

            default:
                // Тоже непредвидька
                return (
                    <></>
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