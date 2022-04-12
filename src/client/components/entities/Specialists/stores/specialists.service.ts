import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { AdminUsersApi } from '../../../../client-tools/api/entities/user/admin-users-api';
import { SpecialistsStore } from './specialists.store';

export class SpecialistsService {
    private readonly _usersAdminApi: AdminUsersApi;

    constructor(private readonly _rootStore: RootStore, private readonly _specialistsStore: SpecialistsStore) {
        this._usersAdminApi = this._rootStore.adminApi.users;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        runInAction(() => {
            this._rootStore.appStore.setIsLoading(true);
        });

        const response = await this._usersAdminApi.getSpecialists(
            {
                take: this._specialistsStore.take.toString(),
                skip: this._specialistsStore.skip.toString(),
                search: this._specialistsStore.searchValue.trim(),
            },
            signal,
        );

        runInAction(() => {
            this._specialistsStore.setSpecialists(response.items);
            this._specialistsStore.setCount(response.count);
            this._rootStore.appStore.setIsLoading(false);
        });
    }

    async updateSpecialist(description: string): Promise<void> {
        runInAction(() => {
            this._specialistsStore.setIsLoading(true);
        });

        await this._usersAdminApi.updateSpecialist(this._specialistsStore.selectedUser.accountId, { description });
        await this.init();

        runInAction(() => {
            this._specialistsStore.setIsLoading(false);
        });
    }
}
