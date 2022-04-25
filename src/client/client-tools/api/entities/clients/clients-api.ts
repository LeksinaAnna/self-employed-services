import { ApiBaseClient } from '../../api-client/api-client';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import {
    Client,
    ClientId,
    ClientUpdateProperties,
} from '../../../../../server/modules/domains/clients/entities/client.entity';

export class ClientsApi extends ApiBaseClient {
    private readonly prefix = 'api/v1/clients';

    constructor(baseUrl) {
        super(baseUrl);
    }

    async getMyClients(query?: QueryType, signal?: AbortSignal): Promise<ManyItem<Client>> {
        return await this.get(`${this.baseUrl}/${this.prefix}/my`, query, signal);
    }

    async updateClient(clientId: ClientId, properties: ClientUpdateProperties, signal?: AbortSignal): Promise<Client> {
        return await this.patch(`${this.baseUrl}/${this.prefix}/${clientId}`, properties, signal);
    }
}
