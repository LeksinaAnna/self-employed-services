import { Controller, Get, Query } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { NotAuthDecorator } from '../../../../nest-decorators/decorators/not-auth.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Room } from '../entities/room.entity';

@Controller('rooms')
export class RoomsWebController {
    constructor(private readonly _roomsService: RoomsService) {}

    @NotAuthDecorator()
    @Get('/')
    async getRooms(
        @Query() query: QueryType,
    ): Promise<ManyItem<Room>> {
        return await this._roomsService.getRoomsForUser(query);
    }
}