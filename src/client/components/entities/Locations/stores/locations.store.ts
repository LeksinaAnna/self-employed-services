import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import {
    ProfessionType,
    professionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { Rental, WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { RootStore } from '../../../../stores/root.store';
import { LocationsService } from './locations.service';

export class LocationsStore {
    title = '';
    price: number;
    profession: ProfessionType = null;
    locations: Array<Room & WithRentals> = [];
    isCreateModal = false;
    currentDate = moment().format('DD.MM.YYYY');

    startTime = '8:00';
    endTime = '22:00';

    rentals = new Map();

    isLoading = false;

    readonly service: LocationsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new LocationsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get professionList(): string[] {
        const profArr: ProfessionType[] = ['browist', 'barber', 'lashmaker', 'manicurist'];
        return profArr.map(prof => professionTypeDict[prof]);
    }

    get times(): string[] {
        const times = [];
        for (const time of this.rentals.keys()) {
            times.push(time)
        }
        return times;
    }

    setTitle(value: string): void {
        this.title = value;
    }

    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setPrice(value: number): void {
        this.price = value;
    }

    setRooms(rooms: Array<Room & WithRentals>): void {
        this.locations = rooms;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setProfession(profession: string): void {
        if (!profession) {
            this.profession = null;
        }

        for (const key in professionTypeDict) {
            if (professionTypeDict.hasOwnProperty(key) && professionTypeDict[key] === profession) {
                this.profession = key as ProfessionType;
            }
        }
    }

    setRentals(rentals: Rental[]): void {
        if (rentals.length === 0) {
            return
        }

        rentals?.forEach(rental => {
            const startTime = moment(rental.startDate).format('x');
            const endTime = moment(rental.finishDate).format('x');

            // разница между началом и окончанием в часах
            const deferenceHours = (Number(endTime) - Number(startTime))/1000/60/60;

            for (let i = 0; i < deferenceHours; i++) {
                this.rentals.set(moment(rental.startDate).add(i, 'hours').format('HH:mm'), rental);
            }
        });
    }

    destroy(): void {
        this.locations = [];
        this.title = '';
    }

    fillObject(): void {
        const startTime = Number(moment(this.startTime, 'hh:mm').format('x'));
        const endTime = Number(moment(this.endTime, 'hh:mm').format('x'));
        const deferenceHours = (endTime - startTime)/1000/60/60;

        for (let i = 0; i < deferenceHours + 1; i++) {
            this.rentals.set(moment(this.startTime, 'hh:mm').add(i, 'hours').format('HH:mm'), null);
        }
    }
}
