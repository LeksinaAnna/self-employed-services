import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { UsersApi } from '../../../../client-tools/api/entities/user/users-api';
import { ServicesTabStore } from './services-tab.store';

export class ServicesTabService {
    private readonly _usersApi: UsersApi;

    constructor(private readonly _rootStore: RootStore, private readonly _servicesTabStore: ServicesTabStore) {
        this._usersApi = this._rootStore.commonApi.users;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const data = await this._usersApi.getSpecialists({
            take: this._servicesTabStore.take.toString(),
            search: this._servicesTabStore.searchValue.trim(),
            type: this._rootStore.generalPageStore._locationsStore.selectedLocation.type,
        });

        clearTimeout(timer);

        runInAction(() => {
            this._servicesTabStore.setSpecialists(data.items);
            this._servicesTabStore.setCountSpecialists(data.count);
            this._rootStore.appStore.setIsLoading(false);
        });
    }
}
