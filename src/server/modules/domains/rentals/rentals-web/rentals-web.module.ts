import { Module } from '@nestjs/common';
import { RentalsService } from '../services/rentals.service';
import { RoomsAdapterService } from '../../rooms/services/adapters/rooms-adapter.service';
import { RentalsAdapterService } from '../services/adapters/rentals-adapter.service';
import { RentalsWebController } from './rentals-web.controller';

@Module({
    providers: [RentalsService, RentalsAdapterService, RoomsAdapterService],
    controllers: [RentalsWebController]
})
export class RentalsWebModule {}