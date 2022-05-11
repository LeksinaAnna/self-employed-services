import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { LocationsAdminApi } from '../../../../client-tools/api/entities/locations/locations-admin-api';
import { RootStore } from '../../../../stores/root.store';
import { RentalApi } from '../../../../client-tools/api/entities/rental/rental-api';
import { ProfessionType } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { RoomCreateProperties } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationsStore } from './locations.store';

export class LocationsService {
    private timer: NodeJS.Timer;
    private readonly _locationsApi: LocationsAdminApi;
    private readonly _rentalApi: RentalApi;

    constructor(private readonly _locationsStore: LocationsStore, private readonly _rootStore: RootStore) {
        this._locationsApi = this._rootStore.adminApi.locations;
        this._rentalApi = this._rootStore.commonApi.rental;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async createLocation(properties: RoomCreateProperties): Promise<void> {
        await this._locationsApi.createRoom(properties);
        await this.init();
    }

    async updateLocation(properties: RoomCreateProperties): Promise<void> {
        await this._locationsApi.updateRoom(properties);
        await this.init();
    }

    async init(signal?: AbortSignal): Promise<void> {
        runInAction(() => {
            this._rootStore.appStore.setIsLoading(true);
        });

        // Преобразовываем даты вида DD.MM.YYYY в вид TIMESTAMP WITH LOCAL TIME ZONE
        const startDate = moment(this._locationsStore.currentDate, 'DD.MM.YYYY').format();
        const finishDate = moment(this._locationsStore.currentDate, 'DD.MM.YYYY').add(1, 'days').format();

        const skip = this._locationsStore.take * this._locationsStore.currentPage - this._locationsStore.take;

        const rooms = await this._locationsApi.getRooms(
            {
                start_date: startDate,
                finish_date: finishDate,
                take: this._locationsStore.take.toString(),
                skip: skip.toString(),
                search: this._locationsStore.searchValue.trim(),
                type: this._locationsStore.activeTab as ProfessionType,
            },
            signal,
        );

        runInAction(() => {
            this._locationsStore.setRooms(rooms.items);
            this._locationsStore.setCountLocations(rooms.count);
            this._locationsStore.setCountPages(Math.ceil(rooms.count / this._locationsStore.take));
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    onSearchChange(value: string): void {
        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.init();
        }, 300);

        runInAction(() => {
            this._locationsStore.setSearchValue(value);
        });
    }

    async changeTab(tab: ProfessionType): Promise<void> {
        runInAction(() => {
            this._locationsStore.setActiveTab(tab);
            this._locationsStore.currentPage = 1;
        });

        await this.init();
    }

    async changePage(page: number): Promise<void> {
        runInAction(() => {
            this._locationsStore.currentPage = page;
        });

        await this.init();
    }
}
