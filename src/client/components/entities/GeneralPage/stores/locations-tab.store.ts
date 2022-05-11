import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { Room } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { ProfessionType } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { LocationsTabService } from './locations-tab.service';

export class LocationsTabStore {
    locations: Room[] = [];
    selectedLocation: Room = null;
    countLocations = 0;
    take = 10;
    countPages = 1;
    currentPage = 1;

    activeTab: ProfessionType = 'barber';

    searchValue = '';

    readonly service: LocationsTabService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new LocationsTabService(this._rootStore, this);
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setLocations(rooms: Room[]): void {
        this.locations = rooms;
    }

    selectRoom(room: Room): void {
        this.selectedLocation = room;
        this._rootStore.generalPageStore._servicesStore.destroy();
    }

    setCountLocations(value: number): void {
        this.countLocations = value;
    }

    setCountPages(value: number): void {
        this.countPages = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setTab(tab: ProfessionType): void {
        this.activeTab = tab;
    }

    destroy(): void {
        this.countPages = 1;
        this.currentPage = 1;
        this.activeTab = 'barber';
        this.searchValue = '';
        this.locations = [];
        this.countLocations = 0;
        this.selectedLocation = null;
    }
}