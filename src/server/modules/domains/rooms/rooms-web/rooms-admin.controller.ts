import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Room, RoomCreateProperties, RoomId } from '../entities/room.entity';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';
import { WithRentals } from '../../rentals/entities/rental.entity';

@Roles('ADMIN')
@Controller('admin/rooms')
export class RoomsAdminController {
    constructor(private readonly _roomsService: RoomsService) {}

    @Roles('SPECIALIST', 'ADMIN')
    @Get('/')
    async getRooms(@Query() query: QueryType): Promise<ManyItem<Room & WithRentals>> {
        return await this._roomsService.getRooms(query);
    }

    @Roles('SPECIALIST', 'ADMIN')
    @Get('/:roomId')
    async getRoomById(@Param('roomId') roomId: RoomId, @Query() query: QueryType): Promise<Room & WithRentals> {
        return await this._roomsService.getRoomById(roomId, query);
    }

    @Post('/')
    async createRoom(@Body() body: RoomCreateProperties, @CurrentUser() currentUser: TokenData): Promise<Room> {
        return await this._roomsService.createRoom({ ...body, creator: currentUser.userId });
    }

    @Patch('/:roomId')
    async updateRoom(
        @Body() body: RoomCreateProperties,
        @CurrentUser() currentUser: TokenData,
        @Param('roomId') roomId: RoomId,
    ): Promise<Room> {
        return await this._roomsService.updateRoom(roomId, { ...body, updater: currentUser.userId });
    }

    @Delete('/:roomId')
    async deleteRoomById(@Param('roomId') roomId: RoomId, @CurrentUser() currentUser: TokenData): Promise<Room> {
        return await this._roomsService.deleteRoom(roomId, currentUser.userId);
    }
}
