import { makeAutoObservable } from 'mobx';
import { Client } from '../../../../../server/modules/domains/clients/entities/client.entity';
import { TableItem } from '../../../ui/Tables/TableItems/TableWithItems';
import { RootStore } from '../../../../stores/root.store';
import { ClientsService } from './clients.service';

export class ClientsStore {
    take = 10;
    skip = 0;
    countPages = 1;
    currentPage = 1;

    searchValue = '';

    count = 0;
    clients: Client[] = [];
    selectedClient: Client = null;
    isSettingsModal = false;
    isLoading = false;

    readonly service: ClientsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new ClientsService(this, this._rootStore);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setClients(items: Client[]): void {
        this.clients = items;
    }

    setSelectedItem(item: TableItem): void {
        this.selectedClient = this.clients.find(client => client.clientId === item.id);
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setCount(value: number): void {
        this.count = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setCountPages(value: number): void {
        this.countPages = value;
    }

    openSettingsModal(item: TableItem): void {
        this.setSelectedItem(item);
        this.isSettingsModal = true;
    }

    closeSettingsModal(): void {
        this.selectedClient = null;
        this.isSettingsModal = false;
    }
}