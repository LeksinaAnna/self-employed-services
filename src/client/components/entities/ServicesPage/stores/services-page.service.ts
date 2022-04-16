import moment from 'moment';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ServiceListApi } from '../../../../client-tools/api/entities/service-list/service-list-api';
import { ServiceItemId } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesPageStore } from './services-page.store';

export class ServicesPageService {
    timer: NodeJS.Timer;
    private readonly _servicesApi: ServiceListApi;

    constructor(private readonly _rootStore: RootStore, private readonly _servicesPageStore: ServicesPageStore) {
        this._servicesApi = this._rootStore.commonApi.serviceList;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const serviceItems = await this._servicesApi.getServices(
            {
                spec_id: this._rootStore?.appStore?.userData?.accountId,
                take: this._servicesPageStore.take.toString(),
                skip: this._servicesPageStore.skip.toString(),
                search: this._servicesPageStore.searchValue.trim(),
            },
            signal,
        );

        clearTimeout(timer);

        runInAction(() => {
            this._servicesPageStore.setServices(serviceItems.items);
            this._servicesPageStore.setCountItems(serviceItems.count);
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async createServiceItem(): Promise<void> {
        runInAction(() => {
            this._servicesPageStore.setIsLoading(true);
        });

        const duration = moment.duration(this._servicesPageStore.duration).asMilliseconds();

        if (!this._servicesPageStore.selectedService) {
            await this._servicesApi.createService({
                title: this._servicesPageStore.title,
                duration,
                description: this._servicesPageStore.description,
                price: this._servicesPageStore.price,
                type: this._rootStore.appStore?.userData?.profile?.profession,
            });
        }

        if (this._servicesPageStore.selectedService) {
            await this._servicesApi.updateService(this._servicesPageStore.selectedService.serviceId, {
                title: this._servicesPageStore.title,
                duration,
                description: this._servicesPageStore.description,
                price: this._servicesPageStore.price,
                type: this._rootStore.appStore?.userData?.profile?.profession,
            });
        }

        await this.init();

        runInAction(() => {
            this._servicesPageStore.setIsLoading(false);
            this.closeCreateModal();
        });
    }

    async onDelete(itemId: ServiceItemId): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        await this._servicesApi.deleteService(itemId);
        await this.init();

        clearTimeout(timer);

        runInAction(() => {
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async onSearchValue(value: string): Promise<void> {
        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.init();
        }, 300);

        runInAction(() => {
            this._servicesPageStore.setSearchValue(value);
        });
    }

    openCreateModal(): void {
        this._servicesPageStore.setIsModal(true);
    }

    closeCreateModal(): void {
        this._servicesPageStore.setIsModal(false);
    }
}
