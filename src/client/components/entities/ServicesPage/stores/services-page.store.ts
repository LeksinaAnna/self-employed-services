import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesPageService } from './services-page.service';

export class ServicesPageStore {
    services: ServiceItem[] = [];
    countItems = 0;
    searchValue = '';
    take = 10;
    skip = 0;

    isLoading = false;
    isModal = false;

    readonly service: ServicesPageService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new ServicesPageService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setServices(items: ServiceItem[]): void {
        this.services = items;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setIsModal(value: boolean): void {
        this.isModal = value;
    }

    setSkip(value: number): void {
        this.skip = value;
    }

    setCountItems(value: number): void {
        this.countItems = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }
}