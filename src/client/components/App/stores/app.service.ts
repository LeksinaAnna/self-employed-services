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

        const accessToken = localStorage.getItem('AccessToken');
        let user;

        if (accessToken) {
            try {
                user = await this._authApi.checkAuth(signal);
            } catch (e) {
                if (e.statusCode === 401) {
                    localStorage.removeItem('AccessToken');
                }
            }
        }

        if (user) {
            runInAction(() => {
                this._appStore.setUserData(user);
                this._appStore.setIsAuth(true);
            });
        }

        runInAction(() => {
            this._appStore.setIsLoading(false);
            this._appStore.setAppIsInit(true);
        });
    }

    destroy(): void {
        this._appStore.setIsAuth(false);
        this._appStore.setUserData(null);
    }
}