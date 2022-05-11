import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import {
    Specialist,
    UserProfile,
    UserProfileUpdateProperties,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';

export class UsersApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/users';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getSpecialists(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<Specialist>> {
        return await this.get(`${this.prefix}/specialists`, query, signal);
    }

    async updateMyProfile(properties: UserProfileUpdateProperties, signal?: AbortSignal): Promise<UserProfile> {
        return await this.patch(`${this.prefix}/my`, properties, signal);
    }
}