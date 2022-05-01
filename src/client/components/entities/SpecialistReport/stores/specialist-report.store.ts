import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { SpecialistReportService } from './specialist-report.service';

export class SpecialistReportStore {
    startDate: string = moment().format('DD.MM.YYYY');
    finishDate: string = moment().add(1, 'days').format('DD.MM.YYYY');
    countRecords = 0;
    profit = 0; // прибыль
    income = 0; // доход
    expenses = 0; // расход

    readonly service: SpecialistReportService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new SpecialistReportService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
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
}