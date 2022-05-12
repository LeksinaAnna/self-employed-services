import { RoomId } from '../../rooms/entities/room.entity';
import { ServiceItem } from '../../services-list/entities/service-item.entity';
import { UserId } from './user.entity';

export type ProfileId = UserId;
export type ProfessionType = 'barber' | 'browist' | 'lashmaker' | 'manicurist'; // парикмахер, бровист, лешмейкер, мастер маникюра

export const professionTypeDict = {
    barber: 'Парикмахер',
    browist: 'Бровист',
    lashmaker: 'Лешмейкер',
    manicurist: 'Мастер маникюра'
}

export interface Specialist extends UserProfile {
    services: ServiceItem[];
}

export type EmploymentSpecialist = EmploymentItem[];

export interface EmploymentItem {
    startTime: number;
    endTime: number;
}

export interface UserContacts {
    email: string;
    vk?: string;
    instagram?: string;
    phone: string;
}

export interface UserProfileUpdateProperties {
    fullName?: string;
    contacts?: UserContacts;
    birthday?: string;
    selectedRoom?: RoomId;
    profession?: ProfessionType;
}

export interface UserProfileCreateProperties {
    profileId?: UserId;
    fullName: string;
    contacts: UserContacts;
    birthday?: string;
    selectedRoom?: RoomId;
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
    selectedRoom?: RoomId;
}

export class UserProfileEntity implements UserProfile {
    readonly profileId: UserId;
    readonly birthday: string;
    readonly contacts: UserContacts;
    readonly fullName: string;
    readonly profession: ProfessionType;
    readonly selectedRoom: RoomId;

    constructor({ contacts, fullName, birthday, profileId, profession, selectedRoom }: UserProfile) {
        this.profileId = profileId;
        this.birthday = birthday || null;
        this.contacts = contacts;
        this.fullName = fullName;
        this.profession = profession;
        this.selectedRoom = selectedRoom || null;
    }
}
