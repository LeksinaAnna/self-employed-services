import { makeAutoObservable } from 'mobx';
import { LargeRental } from '../../../../../server/modules/domains/rentals/entities/rental.entity';
import { RootStore } from '../../../../stores/root.store';
import { LargeUser } from '../../../../../server/modules/domains/users/entities/user.entity';
import { CalendarService } from './calendar.service';

export class CalendarStore {
    isCreateModal = false;
    isInfoModal = false;
    isLoading = false;

    selectedRental: LargeRental;

    selectedTime: string;
    positionModal: number;

    readonly service: CalendarService;

    private readonly _startTime = '8:00';
    private readonly _endTime = '22:00';

    constructor(private readonly _rootStore: RootStore) {
        this.service = new CalendarService(this._rootStore, this);
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get startTime(): string {
        return this._startTime;
    }

    get endTime(): string {
        return this._endTime;
    }

    get times(): string[] {
        const startHour = Number(this._startTime.split(':')[0]);
        const endHour = Number(this._endTime.split(':')[0]);
        const times = [];

        for (let i = 0; i < endHour - startHour; i++) {
            if (startHour + i < 10) {
                times.push(`0${startHour + i}:00`);
            } else {
                times.push(`${startHour + i}:00`);
            }
        }

        return times;
    }

    get lineWidth(): number {
        return (Number(this._endTime.split(':')[0]) - Number(this._startTime.split(':')[0])) * 60;
    }

    get currentUser(): LargeUser {
        if (this._rootStore.appStore.currentRole === 'SPECIALIST') {
            return this._rootStore.appStore.userData;
        }

        return null;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    openModal(item: LargeRental | string, position: number): void {
        switch (typeof item) {
            case 'string':
                this.selectedTime = item;
                this.isCreateModal = true;
                break;
            case 'object':
                this.selectedRental = item;
                this.isInfoModal = true;
                break;
            default:
                break;
        }

        this.positionModal = position;
    }

    closeModal(): void {
        this.isInfoModal = false;
        this.selectedRental = null;
        this.selectedTime = null;
        this.positionModal = null;
    }
}