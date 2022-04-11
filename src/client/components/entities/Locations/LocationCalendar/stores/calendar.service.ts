import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../../stores/root.store';
import { UserId } from '../../../../../../server/modules/domains/users/entities/user.entity';
import { RoomId } from '../../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationsStore } from '../../stores/locations.store';
import { RentalApi } from '../../../../../client-tools/api/entities/rental/rental-api';
import { CalendarStore } from './calendar.store';

export class CalendarService {
    private readonly _locationsStore: LocationsStore;
    private readonly _rentalApi: RentalApi;

    constructor(private readonly _rootStore: RootStore, private readonly _calendarStore: CalendarStore) {
        this._locationsStore = this._rootStore.locationsStore;
        this._rentalApi = this._rootStore.commonApi.rental;

        makeAutoObservable(this, {}, { autoBind: true })
    }

    async createRental(startTime: string, endTime: string, specialistId: UserId, roomId: RoomId): Promise<void> {
        runInAction(() => {
            this._calendarStore.setIsLoading(true);
        })

        const startDate = this._locationsStore.currentDate + ' ' + startTime;
        const endDate = this._locationsStore.currentDate + ' ' + endTime;

        const startFormatDate = moment(startDate, 'DD.MM.YYYY HH:mm').format();
        const endFormatDate = moment(endDate, 'DD.MM.YYYY HH:mm').format();

        await this._rentalApi.createRental({
            startDate: startFormatDate,
            finishDate: endFormatDate,
            specialistId,
            roomId,
        });

        runInAction(() => {
            this._calendarStore.setIsLoading(false);
        })
    }
}