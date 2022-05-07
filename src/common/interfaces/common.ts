import { UserId } from '../../server/modules/domains/users/entities/user.entity';
import { ProfessionType } from '../../server/modules/domains/users/entities/user-profile.entity';
import { RoomId } from '../../server/modules/domains/rooms/entities/room.entity';
import { RecordStatus } from '../../server/modules/domains/records/entities/record.entity';
import { ClientId } from '../../server/modules/domains/clients/entities/client.entity';

export type Nullable<T> = null | undefined | T;
export type AnyType = any;
export type AnyObject = Record<string, any>;


export interface ManyItem<T> {
    items: T[];
    count: number;
}

export interface WithCreator {
    creator: UserId;
}

export interface WithUpdater {
    updater: UserId;
}

export interface QueryType {
    take?: string;
    skip?: string;
    search?: string;
    type?: ProfessionType;
    status?: RecordStatus;
    start_date?: string;
    finish_date?: string;
    room_id?: RoomId;
    spec_id?: UserId;
    client_id?: ClientId;
}

export const runAsyncAction = (action: () => Promise<void>): void => {
    action();
};

