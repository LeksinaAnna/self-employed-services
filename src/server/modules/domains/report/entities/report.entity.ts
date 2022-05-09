import { RoomId } from '../../rooms/entities/room.entity';
import { ProfessionType } from '../../users/entities/user-profile.entity';

export interface SpecialistReport {
    countRecords: number;
    countClients: number;
    profit: number;
    income: number;
    expenses: number;
    clients: ClientReport[];
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

export interface ClientReport {
    name: string;
    servicesCount: number;
    profit: number;
    amountServices: number;
}