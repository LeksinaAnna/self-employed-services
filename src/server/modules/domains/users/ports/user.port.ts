import { User, UserEmail } from '../entities/user.entity';
import {WithUserProfile} from "../entities/user-profile.entity";

export interface UserPort {
    createAccount(properties: User): Promise<User>;

    getUserByLogin(login: UserEmail): Promise<User & WithUserProfile>;
}
