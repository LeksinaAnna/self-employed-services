import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { ServiceItem } from '../../../../../server/modules/domains/services-list/entities/service-item.entity';
import { ServicesPageService } from './services-page.service';

export class ServicesPageStore {
    services: ServiceItem[] = [];
    selectedService: ServiceItem = null;

    countItems = 0;
    searchValue = '';

    take = 10;
    currentPage = 1;
    countPages = 1;

    title = '';
    duration = '00:30';
    description = '';
    price = 0;

    isLoading = false;
    isModal = false;

    readonly service: ServicesPageService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new ServicesPageService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get timeText(): string {
        if (!this.duration) {
            return '';
        }

        const [hours, minutes] = this.duration.split(':');
        return `${hours} ч ${minutes} мин`;
    }

    setSelectedItem(item: ServiceItem): void {
        this.selectedService = item;
        this.title = item.title;
        this.description = item.description;
        this.price = item.price;

        const hours =
            moment.duration(item.duration).hours() > 10
                ? moment.duration(item.duration).hours()
                : `0${moment.duration(item.duration).hours()}`;
        const minutes =
            moment.duration(item.duration).minutes() > 10
                ? moment.duration(item.duration).minutes()
                : `0${moment.duration(item.duration).minutes()}`;

        this.duration = `${hours}:${minutes}`;
    }

    setDuration(value: string): void {
        this.duration = value;
    }

    setPrice(value: number): void {
        this.price = value;
    }

    setDescription(value: string): void {
        this.description = value;
    }

    setTitle(value: string): void {
        this.title = value;
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

    setCountItems(value: number): void {
        this.countItems = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setCountPages(value: number): void {
        this.countPages = value;
    }

    destroy(): void {
        this.title = '';
        this.price = null;
        this.duration = '00:30';
        this.description = '';
        this.selectedService = null;
    }
}
