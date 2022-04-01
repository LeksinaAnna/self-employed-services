import { LargeUser, User, UserEmail, UserId } from '../entities/user.entity';

export interface UserPort {
    createAccount(properties: User): Promise<User>;

    getUserByLogin(login: UserEmail): Promise<LargeUser>;

    getUserById(userId: UserId): Promise<LargeUser>;
}
