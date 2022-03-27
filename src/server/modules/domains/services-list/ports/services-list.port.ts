import { ServiceItem, ServiceItemId } from '../entities/service-item.entity';
import { ManyItem, QueryType } from '../../../../../common/interfaces/common';

export interface ServicesListPort {
    saveServiceItem(serviceItem: ServiceItem): Promise<ServiceItem>;

    getServices(query?: QueryType): Promise<ManyItem<ServiceItem>>;

    getServiceById(serviceId: ServiceItemId): Promise<ServiceItem>;
}