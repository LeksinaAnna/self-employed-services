import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RoomsService } from '../services/rooms.service';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Room, RoomCreateProperties, RoomId } from '../entities/room.entity';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';

@Controller('rooms')
export class RoomsWebController {
    constructor(private readonly _roomsService: RoomsService) {}

    @Roles('ADMIN', 'SPECIALIST')
    @Get('/')
    async getRooms(@Query() query: QueryType): Promise<ManyItem<Room>> {
        return await this._roomsService.getRooms(query);
    }

    @Roles('ADMIN', 'SPECIALIST')
    @Get('/:roomId')
    async getRoomById(@Param('roomId') roomId: RoomId): Promise<Room> {
        return await this._roomsService.getRoomById(roomId);
    }

    @Roles('ADMIN')
    @Post('/')
    async createRoom(@Body() body: RoomCreateProperties, @CurrentUser() currentUser: TokenData): Promise<Room> {
        return await this._roomsService.createRoom({ ...body, creator: currentUser.userId });
    }

    @Roles('ADMIN')
    @Put('/:roomId')
    async updateRoom(
        @Body() body: RoomCreateProperties,
        @CurrentUser() currentUser: TokenData,
        @Param('roomId') roomId: RoomId,
    ): Promise<Room> {
        return await this._roomsService.updateRoom(roomId, { ...body, updater: currentUser.userId });
    }

    @Roles('ADMIN')
    @Delete('/:roomId')
    async deleteRoomById(@Param('roomId') roomId: RoomId, @CurrentUser() currentUser: TokenData): Promise<Room> {
        return await this._roomsService.deleteRoom(roomId, currentUser.userId);
    }
}
