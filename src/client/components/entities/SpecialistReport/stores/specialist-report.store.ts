import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { SpecialistReportService } from './specialist-report.service';

export class SpecialistReportStore {
    startDate: string = moment().format('DD.MM.YYYY');
    finishDate: string = moment().add(1, 'days').format('DD.MM.YYYY');

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
}