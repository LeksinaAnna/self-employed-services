import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { LocationsApi } from '../../../../client-tools/api/entities/locations/locations-api';
import { AdminReportStore } from './admin-report.store';

export class AdminReportService {
    private readonly _roomsApi: LocationsApi;

    constructor(private readonly _rootStore: RootStore, private readonly _adminReportStore: AdminReportStore) {
        this._roomsApi = this._rootStore.commonApi.locations;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const rooms = await this._roomsApi.getRoomsWithProfit({
            start_date: this._adminReportStore.startDate,
            finish_date: this._adminReportStore.finishDate,
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._adminReportStore.setRooms(rooms);
            this._rootStore.appStore.setIsLoading(false);
        })
    }
}