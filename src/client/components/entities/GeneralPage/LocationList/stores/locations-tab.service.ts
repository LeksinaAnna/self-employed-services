import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../../stores/root.store';
import { LocationsApi } from '../../../../../client-tools/api/entities/locations/locations-api';
import { ProfessionType } from '../../../../../../server/modules/domains/users/entities/user-profile.entity';
import { LocationsTabStore } from './locations-tab.store';

export class LocationsTabService {
    private readonly _roomsApi: LocationsApi;

    constructor(private readonly _rootStore: RootStore, private readonly _locationsTabStore: LocationsTabStore) {
        this._roomsApi = this._rootStore.commonApi.locations;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        });

        const skip = this._locationsTabStore.take * this._locationsTabStore.currentPage - this._locationsTabStore.take;

        const data = await this._roomsApi.getRooms({
            skip: skip.toString(),
            take: this._locationsTabStore.take.toString(),
            search: this._locationsTabStore.searchValue,
            type: this._locationsTabStore.activeTab,
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._locationsTabStore.setLocations(data.items);
            this._locationsTabStore.setCountLocations(data.count);
            this._locationsTabStore.setCountPages(Math.ceil(data.count / this._locationsTabStore.take));
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async changeTab(tab: ProfessionType): Promise<void> {
        runInAction(() => {
            this._locationsTabStore.setTab(tab);
        });

        await this.init();
    }
}