import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { LocationsStore } from './locations.store';

export class LocationsService {
    constructor(private readonly _locationsStore: LocationsStore, private readonly _rootStore: RootStore) {

        makeAutoObservable(this, {}, { autoBind: true });
    }

    openCreateModal(): void {
        this._locationsStore.isCreateModal = true;
    }

    closeCreateModal(): void {
        this._locationsStore.isCreateModal = false;
    }

    async createLocation(): Promise<void> {
        console.log('CREATE');
    }
}