import { stringify } from 'querystring';
import { FetchClient } from '../../http/fetch-client';
import { QueryType } from '../../../../common/interfaces/common';
import { ApiError } from './api-error';

export const getOptions = (signal?: AbortSignal): RequestInit => ({
    credentials: 'include',
    signal,
    headers: {
        Pragma: 'no-cache',
        'Content-Type': 'application/json',
    },
});

export class ApiBaseClient {
    readonly baseUrl: string;
    private readonly _fetchClient: FetchClient;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this._fetchClient = new FetchClient(baseUrl);
    }

    public async get<TResult, TQuery extends Record<string, any> = QueryType>(
        url: string,
        qs: TQuery,
        signal?: AbortSignal
    ): Promise<TResult> {
        const response = await this._fetchClient.fetch(
            `${this.baseUrl}${url}?${stringify(qs)}`,
            getOptions(signal),
        );
        if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
        }

        return (await response.json()) as TResult;
    }

    public async patch<TResult>(url: string, body?: any, signal?: AbortSignal): Promise<TResult> {
        const response = await this._fetchClient.fetch(`${this.baseUrl}${url}`, {
            ...{
                method: 'PATCH',
                body: JSON.stringify(body),
            },
            ...getOptions(signal),
        });
        if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
        }
        return (await response.json()) as TResult;
    }

    public async put<TResult>(url: string, body?: any, signal?: AbortSignal): Promise<TResult> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            ...{
                method: 'PUT',
                body: JSON.stringify(body),
            },
            ...getOptions(signal),
        });
        if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
        }
        return (await response.json()) as TResult;
    }

    public async post<TResult>(url: string, body?: any, signal?: AbortSignal): Promise<TResult> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            ...{
                method: 'POST',
                body: JSON.stringify(body),
            },
            ...getOptions(signal),
        });
        if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
        }
        return (await response.json()) as TResult;
    }

    public async delete<TResult>(url: string, signal?: AbortSignal): Promise<TResult> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            ...{ method: 'DELETE' },
            ...getOptions(signal),
        });
        if (!response.ok) {
            throw new ApiError(response.statusText, response.status);
        }
        return (await response.json()) as TResult;
    }
}