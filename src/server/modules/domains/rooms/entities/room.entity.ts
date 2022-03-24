import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../../users/entities/user.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';

export type RoomId = string;

export interface Room {
    roomId: RoomId;
    price: number;
    type: ProfessionType;
    created: string;
    modified: string;
    createdBy: UserId;
    modifiedBy: UserId;
    inBasket: boolean;
}

export class RoomEntity implements Room {
    readonly roomId: RoomId;
    readonly price: number;
    readonly type: ProfessionType;
    readonly created: string;
    readonly modified: string;
    readonly createdBy: UserId;
    readonly modifiedBy: UserId;
    readonly inBasket: boolean;

    constructor({ roomId, price, type, created, modified, createdBy, modifiedBy, inBasket }: Room) {
        this.roomId = roomId || uuidv4();
        this.price = price;
        this.type = type;
        this.created = created || moment().format();
        this.modified = modified || moment().format();
        this.createdBy = createdBy;
        this.modifiedBy = modifiedBy;
        this.inBasket = inBasket || false;
    }
}