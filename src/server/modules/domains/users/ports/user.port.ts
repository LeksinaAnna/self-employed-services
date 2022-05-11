import { LargeUser, User, UserEmail, UserId } from '../entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Specialist } from '../entities/user-profile.entity';

export interface UserPort {
    createAccount: (properties: User) => Promise<User>;

    getUserByLogin: (login: UserEmail) => Promise<LargeUser>;

    getUserById: (userId: UserId) => Promise<LargeUser>;

    getSpecialistsForAdmin: (query: QueryType, withDescription?: boolean) => Promise<ManyItem<LargeUser>>;

    getSpecialistsForUser: (query: QueryType) => Promise<ManyItem<Specialist>>;
}
