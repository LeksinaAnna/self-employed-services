import { makeAutoObservable } from 'mobx';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { AppStore } from '../components/App/stores/app.store';
import { AuthStore } from '../components/entities/Auth/stores/auth.store';
import { LocationsStore } from '../components/entities/Locations/stores/locations.store';

export class RootStore {
    readonly appStore: AppStore;
    readonly authStore: AuthStore;
    readonly locationsStore: LocationsStore;

    constructor(readonly commonApi: CommonApiStore) {
        this.appStore = new AppStore(this);
        this.authStore = new AuthStore(this);
        this.locationsStore = new LocationsStore(this);

        makeAutoObservable(this, {}, { autoBind: true });
    }
}