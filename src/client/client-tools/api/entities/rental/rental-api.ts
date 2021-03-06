import { ApiBaseClient } from '../../api-client/api-client';
import {
    Rental,
    RentalCreateProperties,
    RentalId,
} from '../../../../../server/modules/domains/rentals/entities/rental.entity';

export class RentalApi extends ApiBaseClient {
    private readonly prefix = '/api/v1/rentals';

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public async createRental(properties: RentalCreateProperties, signal?: AbortSignal): Promise<Rental> {
        return await this.post(`${this.prefix}`, properties, signal);
    }

    public async deleteRental(rentalId: RentalId, signal?: AbortSignal): Promise<Rental> {
        return await this.delete(`${this.prefix}/${rentalId}`, signal);
    }
}