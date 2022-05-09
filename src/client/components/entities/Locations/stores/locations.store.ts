import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { ProfessionType } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { LargeRoom, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { RootStore } from '../../../../stores/root.store';
import { LocationsService } from './locations.service';

export class LocationsStore {
    locations: LargeRoom[] = [];
    selectedLocation: LargeRoom = null;
    countLocations = 0;

    isLocationModal = false;
    activeTab = 'all';

    take = 10;
    countPages = 1;
    currentPage = 1;
    currentDate = moment().format('DD.MM.YYYY');
    searchValue = '';

    isLoading = false;

    readonly service: LocationsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new LocationsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    openLocationModal(roomId?: RoomId): void {
        this.isLocationModal = true;
        this.selectedLocation = this.locations.find(room => room.roomId === roomId);
    }

    closeLocationModal(): void {
        this.isLocationModal = false;
        this.selectedLocation = null;
    }

    setRooms(rooms: LargeRoom[]): void {
        this.locations = rooms;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setCountPages(value: number): void {
        this.countPages = value;
    }

    setCountLocations(value: number): void {
        this.countLocations = value;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setActiveTab(tab: ProfessionType): void {
        this.activeTab = tab;
    }

    destroy(): void {
        this.locations = [];
    }
}
