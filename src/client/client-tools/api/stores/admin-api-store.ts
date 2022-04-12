import { AdminUsersApi } from '../entities/user/admin-users-api';

export class AdminApiStore {
    users = new AdminUsersApi(this._baseUrl);

    constructor(private readonly _baseUrl: string) {}
}
