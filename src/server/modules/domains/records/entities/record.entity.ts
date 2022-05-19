import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { ServiceItemId, WithServiceItem } from '../../services-list/entities/service-item.entity';
import { UserId } from '../../users/entities/user.entity';
import { ClientId, WithClient } from '../../clients/entities/client.entity';
import { RoomId } from '../../rooms/entities/room.entity';

export type RecordId = string;
export type RecordStatus = 'accepted' | 'canceled' | 'sent';

export interface WithRecords {
    records: Record[];
}

export type LargeRecord = Record & WithClient & WithServiceItem;

export interface RecordUpdateProperties {
    recordId?: RecordId;
    status?: RecordStatus;
    inBasket?: boolean;
    recordDate?: string;
}

export interface RecordCreateProperties {
    serviceId: ServiceItemId;
    specialistId: UserId;
    clientId?: ClientId;
    recordDate: string;
    roomId?: RoomId;
    status?: RecordStatus;
    inBasket?: boolean;
}

export interface Record {
    recordId?: RecordId;
    serviceId: ServiceItemId;
    specialistId: UserId;
    clientId: ClientId;
    roomId: RoomId;
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
    readonly roomId: RoomId;

    constructor({ recordId, serviceId, status, recordDate, created, inBasket, specialistId, clientId, roomId }: Record) {
        this.recordId = recordId || uuidv4();
        this.serviceId = serviceId;
        this.status = status || 'sent';
        this.recordDate = recordDate;
        this.created = created || moment().format();
        this.specialistId = specialistId;
        this.inBasket = inBasket || false;
        this.clientId = clientId;
        this.roomId = roomId;
    }
}
