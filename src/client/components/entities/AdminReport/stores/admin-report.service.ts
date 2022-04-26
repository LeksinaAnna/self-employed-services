import moment from 'moment';
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
            start_date: moment(this._adminReportStore.startDate, 'DD.MM.YYYY').startOf('day').format(),
            finish_date: moment(this._adminReportStore.finishDate, 'DD.MM.YYYY').endOf('day').format(),
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._adminReportStore.setRooms(rooms);
            this._rootStore.appStore.setIsLoading(false);
        })
    }
}