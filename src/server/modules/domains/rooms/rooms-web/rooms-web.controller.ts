import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Room } from '../entities/room.entity';

@Controller('rooms')
export class RoomsWebController {
    constructor(private readonly _roomsService: RoomsService) {}

    @Get('/')
    async getRooms(@Query() query: QueryType): Promise<ManyItem<Room>> {
        return await this._roomsService.getRooms(query);
    }
}
