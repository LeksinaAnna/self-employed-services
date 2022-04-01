import { makeAutoObservable } from 'mobx';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { AppStore } from '../components/App/stores/app.store';
import { AuthStore } from '../components/entities/Auth/stores/auth.store';

export class RootStore {
    readonly appStore: AppStore;
    readonly authStore: AuthStore;

    constructor(readonly commonApi: CommonApiStore) {
        this.appStore = new AppStore(this);
        this.authStore = new AuthStore(this);

        makeAutoObservable(this, {}, { autoBind: true });
    }
}