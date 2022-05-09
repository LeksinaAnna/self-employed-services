import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { ClientReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { SpecialistReportService } from './specialist-report.service';

export class SpecialistReportStore {
    startDate: string = moment().startOf('month').format('DD.MM.YYYY');
    finishDate: string = moment().add(1, 'days').endOf('month').format('DD.MM.YYYY');
    countRecords = 0;
    profit = 0; // прибыль
    income = 0; // доход
    expenses = 0; // расход
    clientsReport: ClientReport[] = [];

    take = 10;
    searchValue = '';
    countPages = 1;
    currentPage = 1;

    readonly service: SpecialistReportService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new SpecialistReportService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setClientsReport(items: ClientReport[]): void {
        this.clientsReport = items;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setCountPages(value: number): void {
        this.countPages = value;
    }

    setStartDate(value: string): void {
        this.startDate = value;
    }

    setFinishDate(value: string): void {
        this.finishDate = value;
    }

    setCountRecords(value: number): void {
        this.countRecords = value;
    }

    setProfit(value: number): void {
        this.profit = value;
    }

    setIncome(value: number): void {
        this.income = value;
    }

    setExpenses(value: number): void {
        this.expenses = value;
    }

    destroy(): void {
        this.profit = 0;
        this.clientsReport = [];
        this.expenses = 0;
        this.countRecords = 0;
        this.searchValue = '';
        this.currentPage = 1;
        this.countPages = 1;
    }
}