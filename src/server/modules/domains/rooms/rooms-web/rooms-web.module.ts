import { Module } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { RoomsAdapterService } from '../services/adapters/rooms-adapter.service';
import { RoomsAdminController } from './rooms-admin.controller';
import { RoomsWebController } from './rooms-web.controller';

@Module({
    providers: [RoomsService, RoomsAdapterService],
    controllers: [RoomsAdminController, RoomsWebController],
    exports: [RoomsService, RoomsAdapterService]
})
export class  RoomsWebModule {}
