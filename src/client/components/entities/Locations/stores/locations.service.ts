import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { LocationsApi } from '../../../../client-tools/api/entities/locations/locations-api';
import { RootStore } from '../../../../stores/root.store';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { RentalApi } from '../../../../client-tools/api/entities/rental/rental-api';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationsStore } from './locations.store';

export class LocationsService {
    private timer: NodeJS.Timer;
    private readonly _locationsApi: LocationsApi;
    private readonly _rentalApi: RentalApi;

    constructor(private readonly _locationsStore: LocationsStore, private readonly _rootStore: RootStore) {
        this._locationsApi = this._rootStore.commonApi.locations;
        this._rentalApi = this._rootStore.commonApi.rental;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    openCreateModal(): void {
        this._locationsStore.isCreateModal = true;
    }

    closeCreateModal(): void {
        this._locationsStore.isCreateModal = false;
    }

    async createLocation(): Promise<void> {
        runInAction(() => {
            this._locationsStore.setIsLoading(true);
        });

        await this._locationsApi.createRoom({
            type: this._locationsStore.profession,
            price: this._locationsStore.price,
            title: this._locationsStore.title,
        });

        await this.init();

        runInAction(() => {
            this._locationsStore.setIsLoading(false);
            this.closeCreateModal();
        });
    }

    async init(signal?: AbortSignal): Promise<void> {
        runInAction(() => {
            this._rootStore.appStore.setIsLoading(true);
        });

        // Преобразовываем даты вида DD.MM.YYYY в вид TIMESTAMP WITH LOCAL TIME ZONE
        const startDate = moment(this._locationsStore.currentDate, 'DD.MM.YYYY').format();
        const finishDate = moment(this._locationsStore.currentDate, 'DD.MM.YYYY').add(1, 'days').format();

        const rooms = await this._locationsApi.getRooms(
            {
                start_date: startDate,
                finish_date: finishDate,
                search: this._locationsStore.searchValue,
            },
            signal,
        );

        runInAction(() => {
            this._locationsStore.setRooms(rooms.items);
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async createRental(startTime: string, endTime: string, specialistId: UserId, roomId: RoomId): Promise<void> {
        const startDate = this._locationsStore.currentDate + ' ' + startTime;
        const endDate = this._locationsStore.currentDate + ' ' + endTime;

        const startFormatDate = moment(startDate, 'DD.MM.YYYY HH:mm').format();
        const endFormatDate = moment(endDate, 'DD.MM.YYYY HH:mm').format();

        await this._rentalApi.createRental({
            startDate: startFormatDate,
            finishDate: endFormatDate,
            specialistId,
            roomId,
        });

        await this.init();
    }

    onSearchChange(value: string): void {
        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.init();
        }, 300);

        runInAction(() => {
            this._locationsStore.setSearchValue(value);
        })
    }
}
