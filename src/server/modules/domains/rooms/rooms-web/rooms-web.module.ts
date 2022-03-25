import { Module } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { RoomsAdapterService } from '../services/adapters/rooms-adapter.service';
import { RoomsWebController } from './rooms-web.controller';

@Module({
    providers: [RoomsService, RoomsAdapterService],
    controllers: [RoomsWebController]
})
export class  RoomsWebModule {}
