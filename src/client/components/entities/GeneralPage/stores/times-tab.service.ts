import { makeAutoObservable, runInAction } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { UsersApi } from '../../../../client-tools/api/entities/user/users-api';
import { EmploymentSpecialist } from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { UserId } from '../../../../../server/modules/domains/users/entities/user.entity';
import { TimesTabStore } from './times-tab.store';

export class TimesTabService {
    private readonly _usersApi: UsersApi;

    constructor(private readonly _rootStore: RootStore, private readonly _timesStore: TimesTabStore) {
        this._usersApi = this._rootStore.commonApi.users;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const data = await this.getEmploymentSpecialist(
            this._rootStore.generalPageStore._servicesStore.selectedSpecialist.profileId,
        );

        clearTimeout(timer);

        runInAction(() => {
            this.generateTimes(data);
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async onChangeDate(value: string): Promise<void> {
        runInAction(() => {
            this._timesStore.setCurrentDate(value);
            this._timesStore.setSelectedTime(null); // При изменении даты сбрасываем выбранное время
        });

        await this.init();
    }

    generateTimes(employment: EmploymentSpecialist): void {
        const times = []; // Сюда складываются сгенерированные часы записи с шагом в 30 минут
        const employmentTimes = []; // Сюда складываются сгенерированные часы занятости

        const startTime = '11:00'; // Начало рабочего дня специалиста. Идеально тянуть из профиля выбранного специалиста
        const endTime = '21:00'; // Окончание рабочего дня специалиста. Идеально тянуть из профиля выбранного специалиста
        const timeStep = 30; // Шаг времени в минутах

        const diff = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'hours') * 60;
        // diff - кол-во минут рабочего дня

        // diff / timeStep - Вычисляем сколько будет отрезков. Бежим по отрезкам и присваиваем время записи
        for (let i = 0; i < diff / timeStep; i++) {
            const time = moment(this._timesStore.currentDate + ' ' + startTime, 'DD.MM.YYYY HH:mm').add(
                timeStep * i,
                'minutes',
            );

            // Берем каждую запись специалиста и проверяем: если текущий отрезок больше или равен началу записи
            // и текущий отрезок меньше окончания записи, то отрезок считаем занятым
            if (employment.some(emp => time.unix() >= emp.startTime && time.unix() < emp.endTime)) {

                // добавляем отрезок в занятое время
                employmentTimes.push(time.format('HH:mm'));
            }

            // добавляем отрезок в свободное время
            times.push(time.format('HH:mm'));
        }

        this._timesStore.setTimes(times);
        this._timesStore.setEmploymentTimes(employmentTimes);
    }

    async getEmploymentSpecialist(specialistId: UserId): Promise<EmploymentSpecialist> {
        const currentDate = moment(this._timesStore.currentDate, 'DD.MM.YYYY').format();
        return await this._usersApi.getEmploymentSpecialist(specialistId, currentDate);
    }
}