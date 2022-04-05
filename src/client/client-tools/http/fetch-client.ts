import jwtDecode from 'jwt-decode';
import { AccessToken, TokenData, WithAccessToken } from '../../../server/modules/domains/tokens/entities/token.entity';

export class FetchClient {
    constructor(private readonly _baseUrl: string) {}

    private static async originalRequest(url: string, config: RequestInit): Promise<Response> {
        return await fetch(url, config);
    }

    private static async refreshToken(accessToken: AccessToken): Promise<AccessToken> {
        const response = await fetch(`/api/v1/auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data: WithAccessToken = await response.json();

        localStorage.setItem('AccessToken', data.accessToken || null);

        return data.accessToken;
    }

    public async fetch(url: string, config: RequestInit): Promise<Response> {
        let accessToken = localStorage.getItem('AccessToken') || null;

        if (accessToken) {
            // декодируем токен
            const tokenData = jwtDecode<TokenData>(accessToken);

            // Если до окончания токена остается менее 3 минут то отправляем запрос на обновление токена
            const isExpired = Date.now() / 1000 + 3 * 60 > tokenData.exp;

            if (isExpired) {
                accessToken = await FetchClient.refreshToken(accessToken);
            }
        }

        // Каждый запрос присваиваем access token
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await FetchClient.originalRequest(url, config);

        // Потенциальное место для обработки ответа от сервер. Место для INTERCEPTOR

        return response;
    }




}
