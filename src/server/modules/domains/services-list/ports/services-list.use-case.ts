import { ServiceItem, ServiceItemCreateProperties, ServiceItemId } from '../entities/service-item.entity';
import { ManyItem, QueryType, WithCreator, WithUpdater } from '../../../../../common/interfaces/common';
import { UserId } from '../../users/entities/user.entity';

export interface ServicesListUseCase {
    createServiceItem(properties: ServiceItemCreateProperties & WithCreator): Promise<ServiceItem>;

    updateServiceItem(id: ServiceItemId, properties: ServiceItemCreateProperties & WithUpdater): Promise<ServiceItem>;

    deleteServiceItem(id: ServiceItemId, updater: UserId): Promise<ServiceItem>;

    getServiceById(serviceId: ServiceItemId): Promise<ServiceItem>;

    getServices(query: QueryType): Promise<ManyItem<ServiceItem>>;
}