import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { LocationsApi } from '../../../../client-tools/api/entities/locations/locations-api';
import { RootStore } from '../../../../stores/root.store';
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
}
