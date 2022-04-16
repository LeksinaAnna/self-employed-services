import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../users/entities/user.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';

export type ServiceItemId = string;

export interface ServiceItemCreateProperties {
    title: string;
    description: string;
    price: number;
    duration: number;
    type: ProfessionType;
    inBasket?: boolean;
    created?: string;
    modified?: string;
    createdBy?: UserId;
    modifiedBy?: UserId;
}

export interface ServiceItem {
    serviceId?: ServiceItemId;
    title: string;
    description: string;
    price: number;
    duration: number; // ms
    type: ProfessionType;
    created?: string;
    modified?: string;
    createdBy: UserId;
    modifiedBy: UserId;
    inBasket?: boolean;
}

export class ServiceItemEntity implements ServiceItem {
    readonly created: string;
    readonly createdBy: UserId;
    readonly description: string;
    readonly duration: number;
    readonly inBasket: boolean;
    readonly modified: string;
    readonly modifiedBy: UserId;
    readonly price: number;
    readonly serviceId: ServiceItemId;
    readonly title: string;
    readonly type: ProfessionType;

    constructor({ serviceId, title, description, price, duration, type, inBasket, created, createdBy, modifiedBy }: ServiceItem) {
        this.serviceId = serviceId || uuidv4();
        this.title = title;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.type = type;
        this.inBasket = inBasket || false;
        this.created = created || moment().format();
        this.modified = moment().format();
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
    }
}