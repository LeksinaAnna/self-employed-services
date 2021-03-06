import { ApiBaseClient } from '../../api-client/api-client';
import { UserProfileCreateProperties } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { WithAccessToken } from '../../../../../server/modules/domains/tokens/entities/token.entity';
import { LargeUser, UserCreateProperties } from '../../../../../server/modules/domains/users/entities/user.entity';

export class AuthApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/auth';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async login(body: UserCreateProperties, signal?: AbortSignal): Promise<LargeUser & WithAccessToken> {
        return await this.post<LargeUser & WithAccessToken>(`${this.prefix}/login`, body, signal);
    }

    public async logout(signal?: AbortSignal): Promise<{message: 'OK'}> {
        return await this.delete(`${this.prefix}/logout`, signal);
    }

    public async registration(
        body: UserProfileCreateProperties & UserCreateProperties,
        signal?: AbortSignal,
    ): Promise<LargeUser> {
        return await this.post<LargeUser>(`${this.prefix}/registration`, body, signal);
    }

    public async checkAuth(signal?: AbortSignal): Promise<LargeUser> {
        return await this.get(`${this.prefix}/check`, {}, signal);
    }

    public async activateAccount(key: string, signal?: AbortSignal): Promise<{ message: string }> {
        return await this.get(`${this.prefix}/activate`, { key }, signal);
    }
}
