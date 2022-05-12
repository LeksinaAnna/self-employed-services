import {
    EmploymentSpecialist,
    Specialist,
    UserProfile,
    UserProfileCreateProperties,
    UserProfileUpdateProperties
} from '../entities/user-profile.entity';
import {
    LargeUser,
    UserCreateProperties,
    UserEmail,
    UserId,
    UserUpdateProperties,
    UserWithDescription,
} from '../entities/user.entity';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';

export interface UserUseCase {
    createUserAccount: (properties: UserProfileCreateProperties & UserCreateProperties) => Promise<LargeUser>;

    getUserByLogin: (login: UserEmail) => Promise<LargeUser>;

    updateSpecialist: (
        properties: UserUpdateProperties & WithUpdater,
        specialistId: UserId,
    ) => Promise<LargeUser & UserWithDescription>;

    getUserById: (userId: UserId) => Promise<LargeUser>;

    getSpecialistsForUser: (query: QueryType) => Promise<ManyItem<Specialist>>;

    getSpecialistsForAdmin: (query: QueryType) => Promise<ManyItem<LargeUser & UserWithDescription>>;

    updateUserInfo: (userId: UserId, properties: UserProfileUpdateProperties) => Promise<UserProfile>;

    getEmploymentOfSpecialist: (userId: UserId, query?: QueryType) => Promise<EmploymentSpecialist>;
}
