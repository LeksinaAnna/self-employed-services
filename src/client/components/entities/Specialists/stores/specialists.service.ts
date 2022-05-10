import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { AdminUsersApi } from '../../../../client-tools/api/entities/user/admin-users-api';
import { SpecialistsStore } from './specialists.store';

export class SpecialistsService {
    timer: NodeJS.Timer;

    private readonly _usersAdminApi: AdminUsersApi;

    constructor(private readonly _rootStore: RootStore, private readonly _specialistsStore: SpecialistsStore) {
        this._usersAdminApi = this._rootStore.adminApi.users;

        makeAutoObservable(this, {}, {autoBind: true});
    }

    async init(signal?: AbortSignal): Promise<void> {
        // Если в течении 300мс данные не загрузились то будет показан лоадер
        // таким образом предотвращается мигание лоадера
        const timer = setTimeout(() => {
            this._rootStore.appStore.setIsLoading(true);
        }, 300);

        const skip = this._specialistsStore.take * this._specialistsStore.currentPage - this._specialistsStore.take;

        const response = await this._usersAdminApi.getSpecialists(
            {
                take: this._specialistsStore.take.toString(),
                skip: skip.toString(),
                search: this._specialistsStore.searchValue.trim(),
            },
            signal,
        );

        clearTimeout(timer);

        runInAction(() => {
            this._specialistsStore.setSpecialists(response.items);
            this._specialistsStore.setCount(response.count);
            this._specialistsStore.setCountPages(Math.ceil(response.count / this._specialistsStore.take));
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async updateSpecialist(description: string): Promise<void> {
        runInAction(() => {
            this._specialistsStore.setIsLoading(true);
        });

        await this._usersAdminApi.updateSpecialist(this._specialistsStore.selectedUser.accountId, {description});
        await this.init();

        runInAction(() => {
            this._specialistsStore.setIsLoading(false);
        });
    }

    async changePage(page: number): Promise<void> {
        runInAction(() => {
            this._specialistsStore.currentPage = page;
        });

        await this.init();
    }

    async onValueSearch(value: string): Promise<void> {
        runInAction(() => {
            this._specialistsStore.setSearchValue(value);
        });

        clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
            await this.init();
        }, 300);
    }
}
