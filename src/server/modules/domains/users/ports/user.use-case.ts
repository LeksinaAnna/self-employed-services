import { UserProfile, UserProfileCreateProperties } from '../entities/user-profile.entity';
import { LargeUser, UserCreateProperties, UserEmail, UserId, UserWithDescription } from '../entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface UserUseCase {
    createUserAccount(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser>;

    getUserByLogin(login: UserEmail): Promise<LargeUser>;

    updateUser(properties: UserCreateProperties & UserProfileCreateProperties): Promise<UserProfile>;

    getUserById(userId: UserId): Promise<LargeUser>;

    getSpecialists(query: QueryType): Promise<ManyItem<LargeUser>>;

    getSpecialistsWithDescription(query: QueryType): Promise<ManyItem<LargeUser & UserWithDescription>>;
}
