import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RentalsService } from '../services/rentals.service';
import { Roles } from '../../../../nest-decorators/decorators/roles.decorator';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';
import { Rental, RentalCreateProperties, RentalId } from '../entities/rental.entity';
import { CurrentUser } from '../../../../nest-decorators/decorators/current-user.decorator';
import { TokenData } from '../../tokens/entities/token.entity';

@Roles('ADMIN', 'SPECIALIST')
@Controller('rentals')
export class RentalsWebController {
    constructor(private readonly _rentalsService: RentalsService) {}

    @Get('/')
    async getRentals(@Query() query: QueryType): Promise<ManyItem<Rental>> {
        return await this._rentalsService.getRentals(query);
    }

    @Post('/')
    async createRental(@Body() body: RentalCreateProperties, @CurrentUser() currentUser: TokenData): Promise<Rental> {
        return await this._rentalsService.createRental({ ...body, creator: currentUser.userId });
    }

    @Put('/:rentalId')
    async updateRental(
        @Body() body: RentalCreateProperties,
        @CurrentUser() currentUser: TokenData,
        @Param('rentalId') rentalId: RentalId,
    ): Promise<Rental> {
        return await this._rentalsService.updateRental(rentalId, { ...body, updater: currentUser.userId });
    }

    @Delete('/:rentalId')
    async deleteRental(@Param('rentalId') rentalId: RentalId, @CurrentUser() currentUser: TokenData): Promise<Rental> {
        return await this._rentalsService.cancelRental(rentalId, currentUser.userId);
    }
}
