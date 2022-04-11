import { makeAutoObservable } from 'mobx';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { AppStore } from '../components/App/stores/app.store';
import { AuthStore } from '../components/entities/Auth/stores/auth.store';
import { LocationsStore } from '../components/entities/Locations/stores/locations.store';
import { SpecialistsStore } from '../components/entities/Specialists/stores/specialists.store';

export class RootStore {
    readonly appStore: AppStore;
    readonly authStore: AuthStore;
    readonly locationsStore: LocationsStore;
    readonly specialistsStore: SpecialistsStore;

    constructor(readonly commonApi: CommonApiStore) {
        this.appStore = new AppStore(this);
        this.authStore = new AuthStore(this);
        this.locationsStore = new LocationsStore(this);
        this.specialistsStore = new SpecialistsStore(this);

        makeAutoObservable(this, {}, { autoBind: true });
    }
}