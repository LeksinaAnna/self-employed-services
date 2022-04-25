import { ApiBaseClient } from '../../api-client/api-client';
import {
    LargeRoom,
    Room,
    RoomCreateProperties,
    RoomId, RoomWithProfit,
} from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { WithRentals } from '../../../../../server/modules/domains/rentals/entities/rental.entity';

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

    public async getRooms(query: QueryType = {}, signal?: AbortSignal): Promise<ManyItem<LargeRoom>> {
        return await this.get(`${this.prefix}`, query, signal);
    }

    public async getRoomById(roomId: RoomId, signal?: AbortSignal): Promise<Room & WithRentals> {
        return await this.get(`${this.prefix}/${roomId}`, {}, signal);
    }

    public async getRoomsWithProfit(query: QueryType = {}, signal?: AbortSignal): Promise<RoomWithProfit[]> {
        return await this.get(`${this.prefix}/profit`, query, signal);
    }
}