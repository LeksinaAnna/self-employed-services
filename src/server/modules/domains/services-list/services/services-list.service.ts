import { Injectable, NotFoundException } from '@nestjs/common';
import { ServicesListUseCase } from '../ports/services-list.use-case';
import {
    ServiceItem,
    ServiceItemCreateProperties,
    ServiceItemEntity,
    ServiceItemId,
} from '../entities/service-item.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';
import { ServiceListAdapterService } from './adapters/service-list-adapter.service';

@Injectable()
export class ServicesListService implements ServicesListUseCase {
    constructor(private readonly _servicesListAdapter: ServiceListAdapterService) {}

    async createServiceItem(properties: ServiceItemCreateProperties & WithCreator): Promise<ServiceItem> {
        const service = new ServiceItemEntity({
            ...properties,
            createdBy: properties.creator,
            modifiedBy: properties.creator
        });

        return await this._servicesListAdapter.saveServiceItem(service);
    }

    async deleteServiceItem(id: ServiceItemId, updater: UserId): Promise<ServiceItem> {
        const service = await this._servicesListAdapter.getServiceById(id);
        if (!service) {
            throw new NotFoundException('Выбранная услуга не найдена')
        }

        const serviceEntity = new ServiceItemEntity({
            ...service,
            modifiedBy: updater,
            inBasket: true
        });

        return await this._servicesListAdapter.saveServiceItem(serviceEntity);
    }

    async getServiceById(serviceId: ServiceItemId): Promise<ServiceItem> {
        return await this._servicesListAdapter.getServiceById(serviceId);
    }

    async updateServiceItem(id: ServiceItemId, properties: ServiceItemCreateProperties & WithUpdater): Promise<ServiceItem> {
        const service = await this._servicesListAdapter.getServiceById(id);
        if (!service) {
            throw new NotFoundException('Выбранная услуга не найдена')
        }

        const serviceEntity = new ServiceItemEntity({
            ...service,
            ...properties,
            modifiedBy: properties.updater
        });

        return await this._servicesListAdapter.saveServiceItem(serviceEntity);
    }

    async getServices(query: QueryType): Promise<ManyItem<ServiceItem>> {
        return await this._servicesListAdapter.getServices(query);
    }
}