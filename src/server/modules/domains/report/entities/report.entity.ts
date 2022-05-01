import { RoomId } from '../../rooms/entities/room.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';

export interface SpecialistReport {
    countRecords: number;
    profit: number;
    income: number;
    expenses: number;
    records: object[];
}

export interface AdminReport {
    locations: LocationReport[];
    profit: number;
}

export interface LocationReport {
    roomId: RoomId,
    type: ProfessionType,
    title: string;
    price: number;
    duration: number;
    profit: number;
    countRental: number;
}