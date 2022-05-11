import { AuthApi } from '../entities/auth/auth-api';
import { UsersApi } from '../entities/user/users-api';
import { RentalApi } from '../entities/rental/rental-api';
import { ServiceListApi } from '../entities/service-list/service-list-api';
import { ClientsApi } from '../entities/clients/clients-api';
import { RecordsApi } from '../entities/records/records-api';
import { ReportsApi } from '../entities/reports/reports-api';
import { LocationsApi } from '../entities/locations/locations-api';

export class CommonApiStore {
    auth = new AuthApi(this._baseUrl);
    users = new UsersApi(this._baseUrl);
    rental = new RentalApi(this._baseUrl);
    serviceList = new ServiceListApi(this._baseUrl);
    clients = new ClientsApi(this._baseUrl);
    records = new RecordsApi(this._baseUrl);
    reports = new ReportsApi(this._baseUrl);
    locations = new LocationsApi(this._baseUrl);

    constructor(private readonly _baseUrl: string) {}
}