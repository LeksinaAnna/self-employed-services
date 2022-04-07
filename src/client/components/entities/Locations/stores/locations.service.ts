import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { LocationsApi } from '../../../../client-tools/api/entities/locations/locations-api';
import { RootStore } from '../../../../stores/root.store';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { Nullable } from '../../../../../common/interfaces/common';
import { LocationsStore } from './locations.store';

export class LocationsService {
    private readonly _locationsApi: LocationsApi;

    constructor(private readonly _locationsStore: LocationsStore, private readonly _rootStore: RootStore) {
        this._locationsApi = this._rootStore.commonApi.locations;

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

        const rooms = await this._locationsApi.getRooms({ start_date: startDate, finish_date: finishDate }, signal);

        runInAction(() => {
            this._locationsStore.setRooms(rooms.items);
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    fillRentals(rentals: LargeRental[]): { [key: string]: Nullable<LargeRental> } {
        const rentalsObject = {};

        this._locationsStore.times.forEach(time => {
            if (!rentalsObject[time] && time !== '22:00') {

                // Время в формате 8:00 преобразовываем в 08:00, для того, чтобы корректно работать с ключами
                const formatTime = Number(time.split(':')[0]) < 10 ? `0${time}` : time;
                rentalsObject[formatTime] = null;
            }
        });

        if (rentals.length) {
            rentals.forEach(rental => {
                const startTime = moment(rental.startDate).format('HH:mm');
                const endTime = moment(rental.finishDate).format('HH:mm');

                // заполняем аренду по ключу начала аренды
                rentalsObject[startTime] = rental;

                // Очищаем ключи в деапозоне аренды
                const startHour = Number(startTime.split(':')[0]);
                const endHour = Number(endTime.split(':')[0]);

                for (let i = startHour + 1; i < endHour; i++) {
                    const formatKey = i < 10 ? `0${i}` : i;
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    delete rentalsObject[`${formatKey}:00`];
                }
            });
        }

        return rentalsObject;
    }
}
