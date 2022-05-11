import { AdminUsersApi } from '../entities/user/admin-users-api';
import { LocationsAdminApi } from '../entities/locations/locations-admin-api';

export class AdminApiStore {
    users = new AdminUsersApi(this._baseUrl);
    locations = new LocationsAdminApi(this._baseUrl);

    constructor(private readonly _baseUrl: string) {}
}
