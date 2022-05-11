import { makeAutoObservable } from 'mobx';
import { LocationsTabStore } from '../LocationList/stores/locations-tab.store';
import { RootStore } from '../../../../stores/root.store';

export class GeneralPageStore {
    readonly _locationsStore: LocationsTabStore;

    steps = ['Выбор локации', 'Выбор услуги', 'Выбор мастера', 'Выбор даты'];
    currentStep = 0;
    
    constructor(private readonly _rootStore: RootStore) {
        this._locationsStore = new LocationsTabStore(this._rootStore);
        
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get nextStepDisabled(): boolean {
        switch (this.currentStep) {
            case 0:
                return this._locationsStore.selectedLocation === null;
            case 1:
                return false;
            case 2:
                return false;
            case 3:
                return false;
            default:
                return false;
        }
    }

    nextStep(): void {
        this.currentStep += 1;
    }

    prevStep(): void {
        this.currentStep -= 1;
    }


}