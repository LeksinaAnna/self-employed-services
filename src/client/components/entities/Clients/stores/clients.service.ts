import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ClientsApi } from '../../../../client-tools/api/entities/clients/clients-api';
import { ClientsStore } from './clients.store';

export class ClientsService {
    timer: NodeJS.Timer;

    private readonly _clientsApi: ClientsApi;

    constructor(private readonly _clientsStore: ClientsStore, private readonly _rootStore: RootStore) {
        this._clientsApi = this._rootStore.commonApi.clients;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const skip = this._clientsStore.take * this._clientsStore.currentPage - this._clientsStore.take;

        // Запрос клиентов по апи
        const data = await this._clientsApi.getMyClients({
            take: this._clientsStore.take.toString(),
            skip: skip.toString(),
            search: this._clientsStore.searchValue.trim(),
        }, signal);

        clearTimeout(timer);

        runInAction(() => {
            this._clientsStore.setClients(data.items);
            this._clientsStore.setCount(data.count);
            this._clientsStore.setCountPages(Math.ceil(data.count / this._clientsStore.take));
        });
    }

    async onSearchValue(value: string): Promise<void> {
        runInAction(() => {
            this._clientsStore.setSearchValue(value);
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.init();
        }, 300);
    }

    async updateClient(description: string): Promise<void> {
        await this._clientsApi.updateClient(this._clientsStore.selectedClient.clientId, { description });
        await this.init();
    }

    async changePage(page: number): Promise<void> {
        runInAction(() => {
            this._clientsStore.currentPage = page;
        });

        await this.init();
    }
}