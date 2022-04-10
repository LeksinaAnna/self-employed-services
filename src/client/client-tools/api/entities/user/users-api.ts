import { ApiBaseClient } from '../../api-client/api-client';
import { LargeUser } from '../../../../../server/modules/domains/users/entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export class UsersApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/users';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async getSpecialists(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<LargeUser>> {
        return await this.get(`${this.prefix}/specialists`, query, signal);
    }
}