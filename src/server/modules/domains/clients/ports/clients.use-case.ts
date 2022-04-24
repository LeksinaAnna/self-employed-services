import { Client, ClientCreateProperties, ClientId } from '../entities/client.entity';

export interface ClientsUseCase {
    createClient: (properties: ClientCreateProperties) => Promise<Client>;
    getClientById: (clientId: ClientId) => Promise<Client>;
}