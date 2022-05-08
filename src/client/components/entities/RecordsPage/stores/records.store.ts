import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { LargeRecord, RecordStatus } from '../../../../../server/modules/domains/records/entities/record.entity';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RecordsService } from './records.service';

export class RecordsStore {
    pageIsInit = false; // Флаг инициализации страницы, нужен для защиты от "миганий"

    currentDate: string = moment().format('DD.MM.YYYY');
    currentRoom: Room & WithRentals = null;
    isError: string = null;
    records: LargeRecord[] = [];
    isChangeRoomModal = false;
    activeTab: RecordStatus = 'sent';
    searchValue = '';

    take = 5;
    skip = 0;
    countRecord = 0;

    readonly service: RecordsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new RecordsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setIsInit(value: boolean): void {
        this.pageIsInit = value;
    }

    setIsError(value: string): void {
        this.isError = value;
    }

    setCurrentLocation(item: Room & WithRentals): void {
        this.currentRoom = item;
    }

    setCountRecords(value: number): void {
        this.countRecord = value;
    }

    changeTab(tab: RecordStatus): void {
        this.activeTab = tab;
    }

    setRecords(items: LargeRecord[]): void {
        this.records = items;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    openChangeRoomModal(): void {
        this.isChangeRoomModal = true;
    }

    closeChangeRoomModal(): void {
        this.isChangeRoomModal = false;
    }

    destroy(): void {
        this.records = [];
        this.countRecord = 0;
        this.skip = 0;
        this.currentDate = moment().format('DD.MM.YYYY');
        this.currentRoom = null;
        this.searchValue = '';
        this.pageIsInit = false;
        this.activeTab = 'sent';
    }
}
