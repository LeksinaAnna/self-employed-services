import { makeAutoObservable } from 'mobx';
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
        this._appStore.setIsLoading(true);
        const accessToken = localStorage.getItem('AccessToken');
        let user;

        if (accessToken) {
            user = await this._authApi.checkAuth(signal);
        }

        if (user) {
            this._appStore.setUserData(user);
            this._appStore.setIsAuth(true);
        }

        this._appStore.setIsLoading(false);
    }
}