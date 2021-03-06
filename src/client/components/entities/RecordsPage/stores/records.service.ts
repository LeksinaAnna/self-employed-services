import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { RecordsApi } from '../../../../client-tools/api/entities/records/records-api';
import { RentalApi } from '../../../../client-tools/api/entities/rental/rental-api';
import { Room, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { UsersApi } from '../../../../client-tools/api/entities/user/users-api';
import { LocationsAdminApi } from '../../../../client-tools/api/entities/locations/locations-admin-api';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import {
    RecordId,
    RecordStatus,
    RecordUpdateProperties,
} from '../../../../../server/modules/domains/records/entities/record.entity';
import { QueryType } from '../../../../../common/interfaces/common';
import { RecordsStore } from './records.store';

export class RecordsService {
    timer: NodeJS.Timer = null;

    private readonly _recordsApi: RecordsApi;
    private readonly _rentalsApi: RentalApi;
    private readonly _usersApi: UsersApi;
    private readonly _locationsApi: LocationsAdminApi;

    constructor(private readonly _recordsStore: RecordsStore, private readonly _rootStore: RootStore) {
        this._recordsApi = this._rootStore.commonApi.records;
        this._rentalsApi = this._rootStore.commonApi.rental;
        this._usersApi = this._rootStore.commonApi.users;
        this._locationsApi = this._rootStore.adminApi.locations;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const currentRoom = await this.getCurrentRoom(this._rootStore.appStore?.userData?.profile?.selectedRoom);
        await this.getRecords(this._recordsStore.activeTab);

        clearTimeout(timer);

        runInAction(() => {
            this._recordsStore.setCurrentLocation(currentRoom);
            this._recordsStore.setIsInit(true);
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

        const query: QueryType = {
            take: this._recordsStore.take.toString(),
            skip: this._recordsStore.skip.toString(),
            search: this._recordsStore.searchValue.trim(),
            status,
        };

        if (this._recordsStore.activeTab === 'accepted') {
            query.start_date = moment(this._recordsStore.startDateRecord, 'DD.MM.YYYY').startOf('day').format();
            query.finish_date = moment(this._recordsStore.finishDateRecord, 'DD.MM.YYYY').startOf('day').format();
        }

        const records = await this._recordsApi.getMyRecords(query, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._rootStore.appStore.setIsLoading(false);
            this._recordsStore.setCountRecords(records.count);
            this._recordsStore.setRecords(records.items);
            this._recordsStore.setCountPages(Math.ceil(records.count / this._recordsStore.take));
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

        const currentRecord = this._recordsStore.records.find(record => record.recordId === recordId);
        const startDate = moment(currentRecord.recordDate).format(); // ???????????????? ?? ???????????? ?????????????? timestamp + timeZone
        const finishDate = moment(startDate)
            .add(currentRecord.service.duration / (1000 * 60), 'minutes')
            .format(); // ?? ???????????????????? ?????????????? ???????????????????? ???????????????????????? ???????????? ?? ???????????????? ?? ???????????? ???????? timestamp + timeZone

        try {
            await this._rentalsApi.createRental({
                roomId: this._recordsStore.currentRoom.roomId,
                startDate,
                finishDate,
                specialistId: currentRecord.specialistId,
            });

            await this._recordsApi.updateRecord(recordId, { status: 'accepted' });
            await this.init();
        } catch (e) {
            this._recordsStore.setIsError(e.message);
        }

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

    async onValueSearch(value: string): Promise<void> {
        runInAction(() => {
            this._recordsStore.setSearchValue(value);
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.getRecords(this._recordsStore.activeTab);
        }, 300);
    }

    async onChangeTab(tab: RecordStatus): Promise<void> {
        runInAction(() => {
            this._recordsStore.changeTab(tab);
            this._recordsStore.currentPage = 1;
            this._recordsStore.skip = 0;
        });

        await this.getRecords(tab);
    }

    async updateRecord(properties: RecordUpdateProperties): Promise<void> {
        await this._recordsApi.updateRecord(properties.recordId, properties);
        await this.getRecords(this._recordsStore.activeTab);
    }

    async onChangeStartDate(value: string): Promise<void> {
        runInAction(() => {
            this._recordsStore.setStartDateRecord(value);
        });

        await this.getRecords(this._recordsStore.activeTab);
    }

    async onChangeFinishDate(value: string): Promise<void> {
        runInAction(() => {
            this._recordsStore.setFinishDateRecord(value);
        });

        await this.getRecords(this._recordsStore.activeTab);
    }

    async changePage(page: number): Promise<void> {
        runInAction(() => {
            this._recordsStore.currentPage = page;
            this._recordsStore.skip = this._recordsStore.take * page - this._recordsStore.take;
        });

        await this.getRecords(this._recordsStore.activeTab);
    }
}
