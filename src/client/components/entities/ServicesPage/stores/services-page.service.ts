import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ServiceListApi } from '../../../../client-tools/api/entities/service-list/service-list-api';
import { ServicesPageStore } from './services-page.store';

export class ServicesPageService {
    private readonly _servicesApi: ServiceListApi;

    constructor(private readonly _rootStore: RootStore, private readonly _servicesPageStore: ServicesPageStore) {
        this._servicesApi = this._rootStore.commonApi.serviceList;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const serviceItems = await this._servicesApi.getServices({
            take: this._servicesPageStore.take.toString(),
            skip: this._servicesPageStore.skip.toString(),
            search: this._servicesPageStore.searchValue.trim()
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._servicesPageStore.setServices(serviceItems.items);
            this._servicesPageStore.setCountItems(serviceItems.count);
            this._rootStore.appStore.setIsLoading(false);
        });
    }
}