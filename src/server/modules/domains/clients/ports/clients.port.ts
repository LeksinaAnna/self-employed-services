import { Client, ClientEntity, ClientId } from '../entities/client.entity';

export interface ClientsPort {
    saveClient: (clientEntity: ClientEntity) => Promise<Client>;

    getClientById: (clientId: ClientId) => Promise<Client>;

    getClientByPhoneAndEmail: (phone: string, email: string) => Promise<Client>;
}