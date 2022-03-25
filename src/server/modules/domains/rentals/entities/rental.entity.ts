import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../users/entities/user.entity';

export type RentalId = string;

export interface Rental {
    rentalId?: RentalId;
    roomId: string;
    specialistId: UserId;
    startDate: string;
    finishDate: string;
    created?: string;
    inBasket?: boolean;
}

export interface RentalCreatedProperties {
    rentalId?: RentalId;
    roomId: string;
    specialistId: UserId;
    duration: number;
    created?: string;
    inBasket?: boolean;
}

export class RentalEntity implements Rental {
    readonly rentalId: RentalId;
    readonly roomId: string;
    readonly specialistId: UserId;
    readonly created: string;
    readonly startDate: string;
    readonly finishDate: string;
    readonly inBasket: boolean;

    constructor({ rentalId, specialistId, roomId, startDate, finishDate, created, inBasket }: Rental) {
        this.rentalId = rentalId || uuidv4();
        this.roomId = roomId;
        this.specialistId = specialistId;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.created = created || moment().format();
        this.inBasket = inBasket || false;
    }
}