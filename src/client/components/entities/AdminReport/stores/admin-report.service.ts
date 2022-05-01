import moment from 'moment';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ReportsApi } from '../../../../client-tools/api/entities/reports/reports-api';
import { AdminReportStore } from './admin-report.store';

export class AdminReportService {
    private readonly _reportsApi: ReportsApi;

    constructor(private readonly _rootStore: RootStore, private readonly _adminReportStore: AdminReportStore) {
        this._reportsApi = this._rootStore.commonApi.reports;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const report = await this._reportsApi.getAdminReport({
            start_date: moment(this._adminReportStore.startDate, 'DD.MM.YYYY').startOf('day').format(),
            finish_date: moment(this._adminReportStore.finishDate, 'DD.MM.YYYY').endOf('day').format(),
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._adminReportStore.setRooms(report.locations);
            this._adminReportStore.setGeneralProfit(report.profit);
            this._rootStore.appStore.setIsLoading(false);
        })
    }
}