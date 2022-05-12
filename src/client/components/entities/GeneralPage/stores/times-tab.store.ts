import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { Record } from '../../../../../server/modules/domains/records/entities/record.entity';

export class TimesTabStore {
    
    currentDate = moment().format('DD.MM.YYYY');
    times: string[] = [];
    records: Record[] = [];
    
    constructor(private readonly _rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    
    setCurrentDate(value: string): void {
        this.currentDate = value;
    }

    setTimes(times: string[]): void {
        this.times = times;
    }

    generateTimes(): void {
        const times = []; // Сюда сложим сгенерированные часы записи с шагом в 30 минут

        const startTime = '11:00'; // Начало рабочего дня специалиста. Идеально тянуть из профиля выбранного специалиста
        const endTime = '21:00'; // Окончание рабочего дня специалиста. Идеально тянуть из профиля выбранного специалиста
        const timeStep = 30 // Шаг времени в минутах

        const diff = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'hours') * 60;
        // diff - кол-во минут рабочего дня

        // diff / timeStep - Вычисляем сколько будет отрезков. Бежим по отрезкам и присваиваем время записи
        for (let i = 0; i < diff / timeStep; i++) {
            const time = moment(startTime, 'HH:mm').add(timeStep * i, 'minutes').format('HH:mm');
            times.push(time);
        }

        const time1 = moment(startTime, 'HH:mm');
        const time2 = moment(time1).add(1, 'hours');

        console.log(time1.unix() === time2.unix());

        this.setTimes(times);
    }
}