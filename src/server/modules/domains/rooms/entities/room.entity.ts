import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../users/entities/user.entity';
import { ProfessionType, WithUserProfile } from '../../users/entities/user-profile.entity';
import { WithRentals } from '../../rentals/entities/rental.entity';

export type RoomId = string;

export type LargeRoom = Room & WithRentals & WithUserProfile;

export interface WithRoom {
    room: Room;
}

export interface RoomCreateProperties {
    roomId?: RoomId;
    price: number;
    title: string;
    description?: string;
    type: ProfessionType;
    inBasket?: boolean;
}

export interface Room {
    roomId?: RoomId;
    title: string;
    description?: string;
    price: number;
    type: ProfessionType;
    created?: string;
    modified?: string;
    createdBy: UserId;
    modifiedBy: UserId;
    inBasket?: boolean;
}

export class RoomEntity implements Room {
    readonly roomId: RoomId;
    readonly price: number;
    readonly title: string;
    readonly type: ProfessionType;
    readonly created: string;
    readonly modified: string;
    readonly createdBy: UserId;
    readonly modifiedBy: UserId;
    readonly inBasket: boolean;
    readonly description: string;

    constructor({ roomId, price, title, description, type, created, createdBy, modifiedBy, inBasket }: Room) {
        this.roomId = roomId || uuidv4();
        this.price = price;
        this.title = title;
        this.description = description;
        this.type = type;
        this.created = created || moment().format();
        this.modified = moment().format();
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.inBasket = inBasket || false;
    }
}