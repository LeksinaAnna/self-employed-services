import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { ReportUseCase } from '../ports/report.use-case';
import { UserId } from '../../users/entities/user.entity';
import { AdminReport, LocationReport, SpecialistReport } from '../entities/report.entity';
import { QueryType } from '../../../../../common/interfaces/common';
import { LargeRental } from '../../rentals/entities/rental.entity';
import { RoomsService } from '../../rooms/services/rooms.service';

@Injectable()
export class ReportService implements ReportUseCase {
    constructor(private readonly _roomsService: RoomsService) {}

    private static calculateProfitWithDuration(
        rental: LargeRental,
        price: number,
    ): { profit: number; duration: number } {
        const duration = moment(rental.finishDate).diff(rental.startDate) / (1000 * 60); // Получаем длительность в минутах
        const pricePerMinute = price / 60; // Получаем профит в минуту
        const profit = duration * pricePerMinute; // Вычисляем общий профит по аренде

        return { profit, duration };
    }

    async adminReport(userId: UserId, query: QueryType): Promise<AdminReport> {
        const rooms = await this._roomsService.getRooms(query);

        // Получаем массив преобразованных объектов под отчёт
        const items = rooms.items.map(room => {
            const itemObj: LocationReport = {
                type: room.type,
                roomId: room.roomId,
                price: room.price,
                title: room.title,
                countRental: room.rentals.length,
                profit: 0,
                duration: 0,
            };

            // Получаем массив объектов с профитом и длительностью по каждой аренде
            const rentalsWithProfitAndDuration = room.rentals.map(rental =>
                ReportService.calculateProfitWithDuration(rental, room.price),
            );

            // Для того, чтобы удобно было получить общее кол-во профита\длительности генерируем массив этих значений
            const allProfit = rentalsWithProfitAndDuration.map(info => info.profit);
            const allDuration = rentalsWithProfitAndDuration.map(info => info.duration);

            // С помощью reduce мы складываем между собой значения и получаем итоговую сумму
            itemObj.profit = allProfit.reduce((prev, current) => prev + current, 0);
            itemObj.duration = allDuration.reduce((prev, current) => prev + current, 0);

            // Возвращаем из map готовый объект локации дял отчёта
            return itemObj;
        });

        const generalProfit = items.map(item => item.profit).reduce((prev, current) => prev + current, 0);

        return { locations: items, profit: generalProfit };
    }

    async specialistReport(specId: UserId, query: QueryType): Promise<SpecialistReport> {
        return Promise.resolve(undefined);
    }
}
