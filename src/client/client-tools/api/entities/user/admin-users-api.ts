import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import {
    LargeUser,
    UserId,
    UserUpdateProperties,
    UserWithDescription,
} from '../../../../../server/modules/domains/users/entities/user.entity';

export class AdminUsersApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/admin/users';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async getSpecialists(
        query: QueryType = {},
        signal?: AbortSignal,
    ): Promise<ManyItem<LargeUser & UserWithDescription>> {
        return await this.get(`${this.prefix}`, query, signal);
    }

    public async updateSpecialist(
        specialistId: UserId,
        properties: UserUpdateProperties,
        signal?: AbortSignal,
    ): Promise<LargeUser & UserWithDescription> {
        return await this.patch(`${this.prefix}/${specialistId}`, properties, signal);
    }
}
