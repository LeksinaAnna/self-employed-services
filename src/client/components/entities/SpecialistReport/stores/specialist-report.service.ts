import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ReportsApi } from '../../../../client-tools/api/entities/reports/reports-api';
import { SpecialistReportStore } from './specialist-report.store';

export class SpecialistReportService {
    private readonly _reportApi: ReportsApi;

    constructor(
        private readonly _specialistReportStore: SpecialistReportStore,
        private readonly _rootStore: RootStore,
    ) {
        this._reportApi = this._rootStore.commonApi.reports;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const skip =
            (this._specialistReportStore.take * this._specialistReportStore.countPages) -
            this._specialistReportStore.take;

        const report = await this._reportApi.getSpecialistReport(
            {
                search: this._specialistReportStore.searchValue.trim(),
                take: this._specialistReportStore.take.toString(),
                skip: skip.toString(),
                start_date: this._specialistReportStore.startDate,
                finish_date: this._specialistReportStore.finishDate,
            },
            signal,
        );

        clearTimeout(timer);

        runInAction(() => {
            this._specialistReportStore.setClientsReport(report.clients);
            this._specialistReportStore.setCountRecords(report.countRecords);
            this._specialistReportStore.setIncome(report.income);
            this._specialistReportStore.setExpenses(report.expenses);
            this._specialistReportStore.setProfit(report.profit);
            this._specialistReportStore.setCountPages(Math.ceil(report.countClients / this._specialistReportStore.take));
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async changePage(page: number): Promise<void> {
        runInAction(() => {
            this._specialistReportStore.currentPage = page;
        });

        await this.init();
    }
}
