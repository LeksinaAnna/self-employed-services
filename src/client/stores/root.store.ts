import { makeAutoObservable } from 'mobx';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { AppStore } from '../components/App/stores/app.store';
import { AuthStore } from '../components/entities/Auth/stores/auth.store';
import { LocationsStore } from '../components/entities/Locations/stores/locations.store';
import { SpecialistsStore } from '../components/entities/Specialists/stores/specialists.store';
import { AdminApiStore } from '../client-tools/api/stores/admin-api-store';
import { AdminReportStore } from '../components/entities/AdminReport/stores/admin-report.store';
import { ServicesPageStore } from '../components/entities/ServicesPage/stores/services-page.store';

export class RootStore {
    readonly appStore: AppStore;
    readonly authStore: AuthStore;
    readonly locationsStore: LocationsStore;
    readonly specialistsStore: SpecialistsStore;
    readonly adminReportStore: AdminReportStore;
    readonly servicesPageStore: ServicesPageStore;

    constructor(readonly commonApi: CommonApiStore, readonly adminApi: AdminApiStore) {
        this.appStore = new AppStore(this);
        this.authStore = new AuthStore(this);
        this.locationsStore = new LocationsStore(this);
        this.specialistsStore = new SpecialistsStore(this);
        this.adminReportStore = new AdminReportStore(this);
        this.servicesPageStore = new ServicesPageStore(this);

        makeAutoObservable(this, {}, { autoBind: true });
    }
}