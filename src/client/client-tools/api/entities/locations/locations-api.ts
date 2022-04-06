import { ApiBaseClient } from '../../api-client/api-client';
import { Room, RoomCreateProperties, RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export class LocationsApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/rooms';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async createRoom(properties: RoomCreateProperties, signal?: AbortSignal): Promise<Room> {
        return await this.post(`${this.prefix}/`, properties, signal);
    }

    public async updateRoom(properties: RoomCreateProperties, signal?: AbortSignal): Promise<Room> {
        return await this.patch(`${this.prefix}/${properties.roomId}`, properties, signal);
    }

    public async getRooms(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<Room>> {
        return await this.get(`${this.prefix}`, query, signal);
    }

    public async getRoomById(roomId: RoomId, signal?: AbortSignal): Promise<Room> {
        return await this.get(`${this.prefix}/${roomId}`, {}, signal);
    }
}