import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ServiceItemId } from '../../services-list/entities/service-item.entity';
import { UserId } from '../../users/entities/user.entity';
import { ClientId } from '../../clients/entities/client.entity';

export type RecordId = string;
export type RecordStatus = 'accepted' | 'canceled' | 'sent';

export interface WithRecords {
    records: Record[];
}

export interface RecordUpdateProperties {
    status?: RecordStatus;
    inBasket?: boolean;
    recordDate?: string;
}

export interface RecordCreateProperties {
    serviceId: ServiceItemId;
    specialistId: UserId;
    clientId: ClientId;
    recordDate: string;
    status?: RecordStatus;
    inBasket?: boolean;
}

export interface Record {
    recordId?: RecordId;
    serviceId: ServiceItemId;
    specialistId: UserId;
    clientId: ClientId;
    recordDate: string;
    status?: RecordStatus;
    created?: string;
    inBasket?: boolean;
}

export class RecordEntity implements Record {
    readonly created: string;
    readonly specialistId: UserId;
    readonly inBasket: boolean;
    readonly recordDate: string;
    readonly recordId: RecordId;
    readonly serviceId: ServiceItemId;
    readonly status: RecordStatus;
    readonly clientId: ClientId;

    constructor({ recordId, serviceId, status, recordDate, created, inBasket, specialistId, clientId }: Record) {
        this.recordId = recordId || uuidv4();
        this.serviceId = serviceId;
        this.status = status || 'sent';
        this.recordDate = recordDate;
        this.created = created || moment().format();
        this.specialistId = specialistId;
        this.inBasket = inBasket || false;
        this.clientId = clientId;
    }
}
