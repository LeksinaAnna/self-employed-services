import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { UserId } from '../../users/entities/user.entity';

export type ClientId = string;

export interface WithClient {
    client: Client;
}

export interface ClientCreateProperties {
    name: string;
    phone: string;
    email: string;
    description?: string;
    inBasket?: boolean;
    modifiedBy?: UserId;
}

export interface Client {
    clientId?: ClientId;
    name: string;
    phone: string;
    email: string;
    description?: string;
    inBasket?: boolean;
    created?: string;
    modified?: string;
    modifiedBy?: UserId;
}

export class ClientEntity implements Client {
    readonly clientId: ClientId;
    readonly created: string;
    readonly description: string;
    readonly email: string;
    readonly inBasket: boolean;
    readonly modified: string;
    readonly modifiedBy: UserId;
    readonly name: string;
    readonly phone: string;

    constructor({ clientId, description, modifiedBy, phone, created, inBasket, name, email }: Client) {
        this.clientId = clientId || uuidv4();
        this.email = email;
        this.phone = phone;
        this.created = created || moment().format();
        this.inBasket = inBasket || false;
        this.description = description;
        this.name = name;
        this.modified = moment().format();
        this.modifiedBy = modifiedBy || null;
    }
}