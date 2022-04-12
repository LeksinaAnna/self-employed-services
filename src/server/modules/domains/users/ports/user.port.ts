import { LargeUser, User, UserEmail, UserId } from '../entities/user.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface UserPort {
    createAccount(properties: User): Promise<User>;

    getUserByLogin(login: UserEmail): Promise<LargeUser>;

    getUserById(userId: UserId): Promise<LargeUser>;

    getSpecialists(query: QueryType, withDescription?: boolean): Promise<ManyItem<LargeUser>>;
}
