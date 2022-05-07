import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { RecordsApi } from '../../../../client-tools/api/entities/records/records-api';
import { RentalApi } from '../../../../client-tools/api/entities/rental/rental-api';
import { Room, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { UsersApi } from '../../../../client-tools/api/entities/user/users-api';
import { LocationsApi } from '../../../../client-tools/api/entities/locations/locations-api';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import {
    RecordId,
    RecordStatus,
} from '../../../../../server/modules/domains/records/entities/record.entity';
import { RecordsStore } from './records.store';

export class RecordsService {
    private readonly _recordsApi: RecordsApi;
    private readonly _rentalsApi: RentalApi;
    private readonly _usersApi: UsersApi;
    private readonly _locationsApi: LocationsApi;

    constructor(private readonly _recordsStore: RecordsStore, private readonly _rootStore: RootStore) {
        this._recordsApi = this._rootStore.commonApi.records;
        this._rentalsApi = this._rootStore.commonApi.rental;
        this._usersApi = this._rootStore.commonApi.users;
        this._locationsApi = this._rootStore.commonApi.locations;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const currentRoom = await this.getCurrentRoom(this._rootStore.appStore?.userData?.profile?.selectedRoom);
        await this.getRecords('sent')

        clearTimeout(timer);

        runInAction(() => {
            this._recordsStore.setCurrentLocation(currentRoom);
        });
    }

    async changeRoom(roomId: RoomId): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        await this._usersApi.updateMyProfile({
            selectedRoom: roomId,
        });

        await this._rootStore.appStore.service.init();
        await this.init();

        clearTimeout(timer);

        runInAction(() => {
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async getRecords(status?: RecordStatus, signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const records = await this._recordsApi.getMyRecords(
            {
                take: this._recordsStore.take.toString(),
                skip: this._recordsStore.skip.toString(),
                search: this._recordsStore.searchValue.trim(),
                status,
            },
            signal,
        );

        clearTimeout(timer);

        runInAction(() => {
            this._rootStore.appStore.setIsLoading(false);
            this._recordsStore.setCountRecords(records.count);
            this._recordsStore.setRecords(records.items);
        });
    }

    async getCurrentRoom(roomId: RoomId): Promise<Room & WithRentals> {
        if (!roomId) {
            return null;
        }

        const startTime = moment(this._recordsStore.currentDate, 'DD.MM.YYYY').startOf('day').format();
        const finishTime = moment(this._recordsStore.currentDate, 'DD.MM.YYYY').endOf('day').format();

        return await this._locationsApi.getRoomById(roomId, {
            start_date: startTime,
            finish_date: finishTime,
        });
    }

    async onChangeDate(value: string): Promise<void> {
        runInAction(() => {
            this._recordsStore.setCurrentDate(value);
        });

        await this.init();
    }

    async acceptRecord(recordId: RecordId): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        await this._recordsApi.updateRecord(recordId, { status: 'accepted' });
        await this.init();

        clearTimeout(timer);
    }

    async cancelRecord(recordId: RecordId): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        await this._recordsApi.updateRecord(recordId, { status: 'canceled' });
        await this.init();

        clearTimeout(timer);
    }
}