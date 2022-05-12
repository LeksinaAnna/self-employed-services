import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { LocationsTabStore } from './locations-tab.store';
import { ServicesTabStore } from './services-tab.store';
import { TimesTabStore } from './times-tab.store';

export class GeneralPageStore {
    readonly _locationsStore: LocationsTabStore;
    readonly _servicesStore: ServicesTabStore;
    readonly _timesStore: TimesTabStore;

    steps = ['Выбор локации', 'Выбор мастера и услуги', 'Выбор даты'];
    currentStep = 0;
    
    constructor(private readonly _rootStore: RootStore) {
        this._locationsStore = new LocationsTabStore(this._rootStore);
        this._servicesStore = new ServicesTabStore(this._rootStore);
        this._timesStore = new TimesTabStore(this._rootStore);
        
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get nextStepDisabled(): boolean {
        switch (this.currentStep) {
            case 0:
                return this._locationsStore.selectedLocation === null;
            case 1:
                return this._servicesStore.selectedSpecialist === null || this._servicesStore.selectedService === null;
            case 2:
                return this._timesStore.selectedTime === null;
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

    destroy(): void {
        this.currentStep = 0;
        this._locationsStore.destroy();
        this._servicesStore.destroy();
        this._timesStore.destroy();
    }
}