import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';

export class ServiceListApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/services';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async getServices(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<ServiceItem>> {
        return await this.get(`${this.prefix}`, query, signal);
    }
}