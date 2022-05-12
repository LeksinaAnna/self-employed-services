import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesTabService } from './services-tab.service';

export class ServicesTabStore {
    specialists: Specialist[] = [];
    selectedSpecialist: Specialist = null;
    selectedService: ServiceItem = null;

    countSpecialists = 0;
    countServices = 0;
    countPages = 1;
    currentPage = 1;

    take = 10;
    searchValue = '';

    readonly service: ServicesTabService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new ServicesTabService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setSpecialists(items: Specialist[]): void {
        this.specialists = items;
    }

    setCountSpecialists(value: number): void {
        this.countSpecialists = value;
    }

    setSelectedService(service: ServiceItem, specialist: Specialist): void {
        this.selectedService = service;
        this.selectedSpecialist = specialist;
        this._rootStore.generalPageStore._timesStore.destroy();
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    destroy(): void {
        this.countPages = 1;
        this.currentPage = 1;
        this.countServices = 0;
        this.countSpecialists = 0;
        this.searchValue = '';
        this.specialists = [];
        this.selectedService = null;
        this.selectedSpecialist = null;
    }
}
