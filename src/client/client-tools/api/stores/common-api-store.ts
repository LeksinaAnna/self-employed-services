import { AuthApi } from '../entities/auth/auth-api';
import { LocationsApi } from '../entities/locations/locations-api';

export class CommonApiStore {
    auth = new AuthApi(this._baseUrl);
    locations = new LocationsApi(this._baseUrl);

    constructor(private readonly _baseUrl: string) {}
}