import { User, UserLogin } from '../entities/user.entity';

export interface UserPort {
    createAccount: (properties: User) => Promise<User>;
    getUserByLogin: (login: UserLogin) => Promise<User>;
}