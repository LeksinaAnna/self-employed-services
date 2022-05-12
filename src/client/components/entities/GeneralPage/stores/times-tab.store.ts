import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { Record } from '../../../../../server/modules/domains/records/entities/record.entity';
import { TimesTabService } from './times-tab.service';

export class TimesTabStore {
    
    currentDate = moment().format('DD.MM.YYYY');
    times: string[] = [];
    employmentTimes: string[] = [];
    records: Record[] = [];
    selectedTime: string = null;

    readonly service: TimesTabService;
    
    constructor(private readonly _rootStore: RootStore) {
        this.service = new TimesTabService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    getDisabledTime(time: string): boolean {
        return this.employmentTimes.includes(time) || this.selectedTime === time;
    }
    
    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setTimes(times: string[]): void {
        this.times = times;
    }

    setSelectedTime(time: string): void {
        this.selectedTime = time;
    }
    
    setEmploymentTimes(times: string[]): void {
        this.employmentTimes = times;
    }

    destroy(): void {
        this.selectedTime = null;
        this.records = [];
        this.employmentTimes = [];
    }
}