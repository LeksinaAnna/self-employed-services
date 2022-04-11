import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { UsersApi } from '../../../../client-tools/api/entities/user/users-api';
import { SpecialistsStore } from './specialists.store';

export class SpecialistsService {
    private readonly _usersApi: UsersApi;

    constructor(private readonly _rootStore: RootStore, private readonly _specialistsStore: SpecialistsStore) {
        this._usersApi = this._rootStore.commonApi.users;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(signal?: AbortSignal): Promise<void> {
        runInAction(() => {
            this._rootStore.appStore.setIsLoading(true);
        });

        const response = await this._usersApi.getSpecialists(
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
}
