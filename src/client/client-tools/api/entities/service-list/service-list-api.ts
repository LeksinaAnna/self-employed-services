import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import {
    ServiceItem,
    ServiceItemCreateProperties, ServiceItemId
} from '../../../../../server/modules/domains/services-list/entities/service-item.entity';

export class ServiceListApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/services';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async getServices(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<ServiceItem>> {
        return await this.get(`${this.prefix}`, query, signal);
    }

    public async createService(properties: ServiceItemCreateProperties, signal?: AbortSignal): Promise<ServiceItem> {
        return await this.post(`${this.prefix}`, properties, signal);
    }

    public async updateService(serviceId: ServiceItemId, properties: ServiceItemCreateProperties, signal?: AbortSignal): Promise<ServiceItem> {
        return await this.patch(`${this.prefix}/${serviceId}`, properties, signal);
    }

    public async deleteService(serviceId: ServiceItemId, signal?: AbortSignal): Promise<ServiceItem> {
        return await this.delete(`${this.prefix}/${serviceId}`, signal);
    }
}