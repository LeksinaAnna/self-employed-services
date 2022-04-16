import { Injectable } from '@nestjs/common';
import { createQueryBuilder } from 'typeorm';
import { ServicesListPort } from '../../ports/services-list.port';
import { ServiceItem, ServiceItemId } from '../../entities/service-item.entity';
import { ManyItem, QueryType } from '../../../../../../common/interfaces/common';
import { ServiceItemOrmEntity } from '../../orm-entities/service-item.orm-entity';
import { PersistenceAdapter } from '../../../../common/persistence-adapter/persistence-adapter';

@Injectable()
export class ServiceListAdapterService extends PersistenceAdapter implements ServicesListPort {
    constructor() {
        super();
    }

    async getServiceById(serviceId: ServiceItemId): Promise<ServiceItem> {
        return await createQueryBuilder(ServiceItemOrmEntity, 'service')
            .where(`service.serviceId = :serviceId`, { serviceId })
            .getOne();
    }

    async getServices({ search, take = '10', spec_id, skip = '0', type }: QueryType): Promise<ManyItem<ServiceItem>> {
        const [items, count] = await createQueryBuilder(ServiceItemOrmEntity, 'service')
            .where(qb => {
                qb.andWhere(`service.inBasket = false`);
                if (search) {
                    qb.andWhere(`service.title ILIKE :value`, { value: `%${search}%` });
                }
                if (type) {
                    qb.andWhere(`service.type = :type`, { type });
                }

                if (spec_id) {
                    qb.andWhere(`service.createdBy = :specialistId`, { specialistId: spec_id });
                }
            })
            .take(parseInt(take, 10))
            .skip(parseInt(skip, 10))
            .orderBy(`service.created`, 'DESC')
            .getManyAndCount();

        return { items, count };
    }

    async saveServiceItem(serviceItem: ServiceItem): Promise<ServiceItem> {
        return await this._entityManager.save(ServiceItemOrmEntity, serviceItem);
    }
}
