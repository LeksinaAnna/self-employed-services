import { UserId } from './user.entity';

export type ProfileId = string;

export interface UserContacts {
    email: string;
    vk?: string;
    instagram?: string;
    phone: string;
}

export interface UserProfileCreateProperties {
    userId: UserId;
    fullName: string;
    contacts: UserContacts;
    birthday?: string;
}

export interface UserProfile {
    profileId: UserId;
    fullName: string;
    contacts: UserContacts;
    birthday: string;
}

export class UserProfileEntity implements UserProfile {
    readonly profileId: UserId;
    readonly birthday: string;
    readonly contacts: UserContacts;
    readonly fullName: string;

    constructor({ contacts, fullName, birthday, profileId }: UserProfile) {
        this.profileId = profileId;
        this.birthday = birthday;
        this.contacts = contacts;
        this.fullName = fullName;
    }
}
