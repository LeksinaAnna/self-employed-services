import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Room } from '../entities/room.entity';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';

@Controller('rooms')
export class RoomsWebController {
    constructor(private readonly _roomsService: RoomsService) {}

    @Roles('ADMIN', 'USER')
    @Get('/')
    async getRooms(@Query() query: QueryType): Promise<ManyItem<Room>> {
        return await this._roomsService.getRooms(query);
    }
}
