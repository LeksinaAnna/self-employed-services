import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import {
    ProfessionType,
    professionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { LargeRoom } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RootStore } from '../../../../stores/root.store';
import { LocationsService } from './locations.service';

export class LocationsStore {
    title = '';
    price: number;
    profession: ProfessionType = null;
    locations: LargeRoom[] = [];
    isCreateModal = false;

    currentDate = moment().format('DD.MM.YYYY');
    searchValue = '';

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

    setTitle(value: string): void {
        this.title = value;
    }

    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setPrice(value: number): void {
        this.price = value;
    }

    setRooms(rooms: LargeRoom[]): void {
        this.locations = rooms;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
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

    destroy(): void {
        this.locations = [];
        this.title = '';
    }
}
