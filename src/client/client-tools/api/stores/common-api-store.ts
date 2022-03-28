import { AuthApi } from '../entities/auth/auth-api';

export class CommonApiStore {
    auth = new AuthApi(this._baseUrl);

    constructor(private readonly _baseUrl: string) {}
}