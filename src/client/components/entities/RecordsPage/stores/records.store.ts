import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { LargeRecord, Record } from '../../../../../server/modules/domains/records/entities/record.entity';
import { Rental, WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RecordsService } from './records.service';

export class RecordsStore {
    currentDate: string = moment().format('DD.MM.YYYY');
    currentRoom: Room & WithRentals = null;
    
    take = 10;
    skip = 0;
    countRecord = 0;

    searchValue = '';

    records: LargeRecord[] = [];
    rentals: Rental[] = [];
    newRecords: Record[] = [];

    isChangeRoomModal = false;

    readonly service: RecordsService;
    
    constructor(private readonly _rootStore: RootStore) {
        this.service = new RecordsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true })
    }
    
    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setNewRecords(items: Record[]): void {
        this.newRecords = items;
    }

    setRentals(items: Rental[]): void {
        this.rentals = items;
    }

    setCurrentLocation(item: Room & WithRentals): void {
        this.currentRoom = item;
    }

    setCountRecords(value: number): void {
        this.countRecord = value;
    }

    setRecords(items: LargeRecord[]): void {
        this.records = items;
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
        this.newRecords = [];
        this.rentals = [];
        this.currentDate = moment().format('DD.MM.YYYY');
        this.currentRoom = null;
        this.searchValue = '';
    }
}