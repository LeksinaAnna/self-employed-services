import { makeAutoObservable } from 'mobx';
import {
    ProfessionType,
    professionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RootStore } from '../../../../stores/root.store';
import { LocationsService } from './locations.service';
import moment from 'moment';

export class LocationsStore {
    title = '';
    price = 0;
    profession: ProfessionType = null;
    locations: Room[] = [];
    isCreateModal = false;
    currentDate = moment().format('DD.MM.YYYY');

    readonly service: LocationsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new LocationsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get professionList(): string[] {
        const profArr: ProfessionType[] = ['browist', 'barber', 'lashmaker', 'manicurist'];
        return profArr.map(prof => professionTypeDict[prof]);
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

    setRooms(rooms: Room[]): void {
        this.locations = rooms;
    }

    setProfession(profession: string): void {
        for (const key in professionTypeDict) {
            if (professionTypeDict.hasOwnProperty(key) && professionTypeDict[key] === profession) {
                this.profession = key as ProfessionType;
            }
        }
    }
}
