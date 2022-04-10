import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../users/entities/user.entity';
import { WithUserProfile } from '../../users/entities/user-profile.entity';

export type RentalId = string;

export interface WithRentals {
    rentals: LargeRental[];
}

export type LargeRental = Rental & WithUserProfile;

export interface Rental {
    rentalId?: RentalId;
    roomId: string;
    specialistId?: UserId;
    startDate: string;
    finishDate: string;
    created?: string;
    modified?: string;
    modifiedBy: UserId;
    createdBy?: UserId;
    inBasket?: boolean;
}

export interface RentalCreateProperties {
    rentalId?: RentalId;
    roomId: string;
    specialistId: UserId;
    startDate: string;
    finishDate: string;
    modified?: string;
    modifiedBy?: UserId;
    createdBy?: UserId;
    inBasket?: boolean;
}

export class RentalEntity implements Rental {
    readonly rentalId: RentalId;
    readonly roomId: string;
    readonly specialistId: UserId;
    readonly created: string;
    readonly createdBy: UserId;
    readonly startDate: string;
    readonly finishDate: string;
    readonly modified: string;
    readonly modifiedBy: UserId;
    readonly inBasket: boolean;

    constructor({ rentalId, specialistId, createdBy, roomId, startDate, finishDate, created, inBasket, modifiedBy }: Rental) {
        this.rentalId = rentalId || uuidv4();
        this.roomId = roomId;
        this.specialistId = specialistId || createdBy;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.created = created || moment().format();
        this.modified = moment().format();
        this.modifiedBy = modifiedBy;
        this.inBasket = inBasket || false;
        this.createdBy = createdBy;
    }
}
