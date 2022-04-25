import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../stores/root.store';
import { AuthApi } from '../../../client-tools/api/entities/auth/auth-api';
import { AppStore } from './app.store';

export class AppService {
    private readonly _authApi: AuthApi;

    constructor(private readonly _rootStore: RootStore, private readonly _appStore: AppStore) {
        this._authApi = this._rootStore.commonApi.auth;

        makeAutoObservable(this);
    }

    async init(signal?: AbortSignal): Promise<void> {
        runInAction(() => {
            this._appStore.setIsLoading(true);
        });

        const user = await this._rootStore.authStore.service.checkAuth(signal);

        if (user) {
            runInAction(() => {
                this._appStore.setIsAuth(true);
                this._appStore.setUserData(user);
                this._appStore.setRole(user.roles[0].value);
            });
        }

        runInAction(() => {
            this._appStore.setIsLoading(false);
        });
    }

    destroy(): void {
        this._appStore.setIsAuth(false);
        this._appStore.setUserData(null);
    }
}