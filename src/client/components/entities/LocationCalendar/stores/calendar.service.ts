import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { LocationsStore } from '../../Locations/stores/locations.store';
import { RentalApi } from '../../../../client-tools/api/entities/rental/rental-api';
import { RentalId } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { CalendarStore } from './calendar.store';

export class CalendarService {
    private readonly _locationsStore: LocationsStore;
    private readonly _rentalApi: RentalApi;

    constructor(private readonly _rootStore: RootStore, private readonly _calendarStore: CalendarStore) {
        this._locationsStore = this._rootStore.locationsStore;
        this._rentalApi = this._rootStore.commonApi.rental;

        makeAutoObservable(this, {}, { autoBind: true })
    }

    async createRental(startTime: string, endTime: string, specialistId: UserId, roomId: RoomId, currentDate: string): Promise<void> {
        runInAction(() => {
            this._calendarStore.setIsLoading(true);
        })

        const startDate = currentDate + ' ' + startTime;
        const endDate = currentDate + ' ' + endTime;

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

    async deleteRental(rentalId: RentalId): Promise<void> {
        runInAction(() => {
            this._calendarStore.setIsLoading(true);
        });

        await this._rentalApi.deleteRental(rentalId);

        runInAction(() => {
            this._calendarStore.setIsLoading(false);
        });
    }
}