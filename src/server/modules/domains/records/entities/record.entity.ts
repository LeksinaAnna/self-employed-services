import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ServiceItemId } from '../../services-list/entities/service-item.entity';
import { UserId } from '../../users/entities/user.entity';

export type RecordId = string;
export type RecordStatus = 'considered' | 'accepted' | 'canceled';

export interface WithRecords {
    records: Record[];
}

export interface RecordContacts {
    name: string;
    email: string;
    phone: string;
}

export interface RecordCreateProperties {
    recordId?: RecordId;
    serviceId: ServiceItemId;
    specialistId: UserId;
    recordDate: string;
    status: RecordStatus;
    contacts: RecordContacts;
    created: string;
    inBasket?: boolean;
}

export interface Record {
    recordId?: RecordId;
    serviceId: ServiceItemId;
    specialistId: UserId;
    recordDate: string;
    status: RecordStatus;
    contacts: RecordContacts;
    created: string;
    inBasket?: boolean;
}

export class RecordEntity implements Record {
    readonly created: string;
    readonly specialistId: UserId;
    readonly inBasket: boolean;
    readonly contacts: RecordContacts;
    readonly recordDate: string;
    readonly recordId: RecordId;
    readonly serviceId: ServiceItemId;
    readonly status: RecordStatus;

    constructor({ recordId, serviceId, status, recordDate, created, inBasket, specialistId, contacts }: Record) {
        this.recordId = recordId || uuidv4();
        this.serviceId = serviceId;
        this.status = status;
        this.recordDate = recordDate;
        this.created = created || moment().format();
        this.contacts = contacts;
        this.specialistId = specialistId;
        this.inBasket = inBasket || false;
    }
}
