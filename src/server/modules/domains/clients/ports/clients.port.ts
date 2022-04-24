import { Client, ClientEntity, ClientId } from '../entities/client.entity';
import { UserId } from '../../users/entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface ClientsPort {
    saveClient: (clientEntity: ClientEntity) => Promise<Client>;

    getClientById: (clientId: ClientId) => Promise<Client>;

    getClientByPhoneAndEmail: (phone: string, email: string) => Promise<Client>;

    getClientsBySpecialistId: (specialistId: UserId, query: QueryType) => Promise<ManyItem<Client>>;
}