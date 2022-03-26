import { UserId } from '../../server/modules/domains/users/entities/user.entity';

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
    type?: string;
    start_date?: string;
    finish_date?: string;
    room_id?: string;
    spec_id?: string;
}

