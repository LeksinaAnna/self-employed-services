import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { Specialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { ServiceItemId } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesTabService } from './services-tab.service';

export class ServicesTabStore {
    specialists: Specialist[] = [];
    selectedSpecialist: UserId = null;
    selectedService: ServiceItemId = null;
    currentPage = 1;

    countSpecialists = 0;
    countServices = 0;
    countPages = 1;

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

    setSelectedService(id: ServiceItemId, specialistId: UserId): void {
        this.selectedService = id;
        this.selectedSpecialist = specialistId;
    }

    setCountServices(value: number): void {
        this.countServices = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }
}