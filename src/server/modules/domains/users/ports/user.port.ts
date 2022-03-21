import { User, UserEmail } from '../entities/user.entity';

export interface UserPort {
    createAccount(properties: User): Promise<User>;

    getUserByLogin(login: UserEmail): Promise<User>;
}
