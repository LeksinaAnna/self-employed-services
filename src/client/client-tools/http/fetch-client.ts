import jwtDecode from 'jwt-decode';
import { AccessToken, TokenData, WithAccessToken } from '../../../server/modules/domains/tokens/entities/token.entity';

export class FetchClient {
    constructor(private readonly _baseUrl: string) {}

    public async fetch(url: string, config: RequestInit): Promise<Response> {
        let accessToken = localStorage.getItem('AccessToken') || null;

        if (accessToken) {
            // декодируем токен
            const tokenData = jwtDecode<TokenData>(accessToken);

            // Если до окончания токена остается менее 3 минут то отправляем запрос на обновление токена
            const isExpired = Date.now() + 3 * 60 * 1000 > tokenData.exp;
            if (isExpired) {
                accessToken = await this.refreshToken(accessToken);
            }
        }

        // Каждый запрос присваиваем access token
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        }

        const response = await this.originalRequest(url, config);

        // Потенциальное место для обработки ответа от сервер. Место для INTERCEPTOR

        return response;
    }

    private async originalRequest(url: string, config: RequestInit): Promise<Response> {
        return await fetch(url, config);
    }

    private async refreshToken(accessToken: AccessToken): Promise<AccessToken> {
        const response = await fetch(`${this._baseUrl}/api/v1/auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data: WithAccessToken = await response.json();
        localStorage.setItem('AccessToken', JSON.stringify(data.accessToken));

        return data.accessToken;
    }
}
