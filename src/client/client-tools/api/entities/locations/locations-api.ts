import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';

export class LocationsApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/rooms';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async getRooms(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<LargeRoom>> {
        return await this.get(`${this.prefix}`, query, signal);
    }
}