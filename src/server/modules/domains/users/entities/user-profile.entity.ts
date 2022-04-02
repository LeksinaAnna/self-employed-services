import { UserId } from './user.entity';

export type ProfileId = UserId;
export type ProfessionType = 'barber' | 'browist' | 'lashmaker' | 'manicurist'; // парикмахер, бровист, лешмейкер, мастер маникюра

export const ProfessionTypeDict = {
    barber: 'Парикмахер',
    browist: 'Бровист',
    lashmaker: 'Лешмейкер',
    manicurist: 'Мастер маникюра'
}

export interface UserContacts {
    email: string;
    vk?: string;
    instagram?: string;
    phone: string;
}

export interface UserProfileCreateProperties {
    profileId?: UserId;
    fullName: string;
    contacts: UserContacts;
    birthday?: string;
    profession: ProfessionType;
}

export interface WithUserProfile {
    profile: UserProfile;
}

export interface UserProfile {
    profileId?: ProfileId;
    fullName: string;
    contacts: UserContacts;
    birthday?: string;
    profession: ProfessionType;
}

export class UserProfileEntity implements UserProfile {
    readonly profileId: UserId;
    readonly birthday: string;
    readonly contacts: UserContacts;
    readonly fullName: string;
    readonly profession: ProfessionType;

    constructor({ contacts, fullName, birthday, profileId, profession }: UserProfile) {
        this.profileId = profileId;
        this.birthday = birthday || null;
        this.contacts = contacts;
        this.fullName = fullName;
        this.profession = profession;
    }
}
