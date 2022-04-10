import moment from 'moment';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RentalsUseCase } from '../ports/rentals.use-case';
import { UserId } from '../../users/entities/user.entity';
import { Rental, RentalCreateProperties, RentalEntity, RentalId } from '../entities/rental.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { RoomsAdapterService } from '../../rooms/services/adapters/rooms-adapter.service';
import { RoomId } from '../../rooms/entities/room.entity';
import { RentalsAdapterService } from './adapters/rentals-adapter.service';

@Injectable()
export class RentalsService implements RentalsUseCase {
    constructor(
        private readonly _rentalsAdapter: RentalsAdapterService,
        private readonly _roomsAdapter: RoomsAdapterService,
    ) {}

    async cancelRental(rentalId: RentalId, updater: UserId): Promise<Rental> {
        // Получаем аренду по id
        const rental = await this._rentalsAdapter.getRentalById(rentalId);

        if (!rental) {
            // Если не нашли, то возвращаем ошибку NotFound
            throw new NotFoundException();
        }
        // Обновляем аренду, ставим флаг false на inBasket и указываем кто обновил
        const updatedRental = new RentalEntity({ ...rental, inBasket: true, modifiedBy: updater });

        // Сохраняем
        return await this._rentalsAdapter.saveRental(updatedRental);
    }

    async createRental(properties: RentalCreateProperties & WithCreator): Promise<Rental> {
        // Проверяем есть ли помещение
        const room = await this._roomsAdapter.getRoomById(properties.roomId);
        if (!room) {
            throw new NotFoundException('Помещение которое вы пытаетесь арендовать не существует');
        }
        // Проверяем активную аренду в диапозоне дат
        await this.checkActiveRental(properties.roomId, properties.startDate, properties.finishDate);

        // Получаем набор данных для сохранения
        const rentalEntity = new RentalEntity({
            ...properties,
            createdBy: properties.creator,
            modifiedBy: properties.creator,
        });

        return await this._rentalsAdapter.saveRental(rentalEntity);
    }

    async getRentals(query?: QueryType): Promise<ManyItem<Rental>> {
        return await this._rentalsAdapter.getRentals(query);
    }

    async getRentalsByRoomId(roomId: RoomId, query?: QueryType): Promise<Rental> {
        return await this._rentalsAdapter.getRentalsByRoomId(roomId, query);
    }

    async getRentalsByRoomIdAndSpecId(specialistId: UserId, roomId: RoomId): Promise<ManyItem<Rental>> {
        return await this._rentalsAdapter.getRentalsBySpecId(specialistId, roomId);
    }

    async getRentalsBySpecId(specialistId: UserId): Promise<ManyItem<Rental>> {
        return await this._rentalsAdapter.getRentalsBySpecId(specialistId);
    }

    async updateRental(rentalId: RentalId, properties: RentalCreateProperties & WithUpdater): Promise<Rental> {
        // Получаем аренду по id
        const rental = await this._rentalsAdapter.getRentalById(rentalId);
        if (!rental) {
            // Если не нашли, то возвращаем ошибку NotFound
            throw new NotFoundException();
        }

        // Проверяем активную аренду в диапозоне дат
        await this.checkActiveRental(properties.roomId, properties.startDate, properties.finishDate, rentalId);

        // Получаем набор данных для сохранения
        const updatedRental = new RentalEntity({ ...rental, ...properties, modifiedBy: properties.updater });

        return await this._rentalsAdapter.saveRental(updatedRental);
    }

    /**
     * Метод проверки пересечения создаваемой/обновляемой аренды с уже имеющимися арендами помещения.
     *
     * Приватный метод, используется строго в рамках этого сервиса
     *
     * @param roomId - ID помещения
     * @param startDate - Дата и время начала аренды
     * @param finishDate - Дата и время окончания аренды
     * @param rentalId - Если происходит обновление аренды, то это свойство необходимо для корректного обновления
     * @private
     */
    private async checkActiveRental(
        roomId: RoomId,
        startDate: string,
        finishDate: string,
        rentalId?: RentalId,
    ): Promise<void> {
        const items = await this._rentalsAdapter.isRentalByDates(startDate, finishDate, roomId);

        // Проверяем если нашлось всего 1 аренда и эта аренда обновляемая, то все ок
        if (items.some(rental => rental.rentalId === rentalId) && items.length === 1) {
            return;
        }

        if (items.length > 0) {
            throw new BadRequestException(
                `Это время уже занято c ${moment(items[0].startDate).format('HH:mm')} до ${
                    moment(items[0].finishDate).format('HH:mm')
                }`,
            );
        }
    }
}
