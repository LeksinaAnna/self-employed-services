import { Toast } from '@skbkontur/react-ui';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { AuthApi } from '../../../../client-tools/api/entities/auth/auth-api';
import { AppStore } from '../../../App/stores/app.store';
import { AuthStore } from './auth.store';

export class AuthService {
    private readonly _authApi: AuthApi;
    private readonly _appStore: AppStore;

    constructor(private readonly _rootStore: RootStore, private readonly _authStore: AuthStore) {
        this._authApi = this._rootStore.commonApi.auth;
        this._appStore = this._rootStore.appStore;

        makeAutoObservable(this, {}, { autoBind: true });
    }

    async login(): Promise<void> {
        runInAction(() => {
            this._authStore.setIsLoading(true);
        });

        const { accessToken, ...user } = await this._authApi.login({
            email: this._authStore.login,
            password: this._authStore.password,
        });

        if (user && accessToken) {
            localStorage.setItem('AccessToken', accessToken);
            runInAction(() => {
                this._appStore.setUserData(user);
                this._appStore.setIsAuth(true);
            });
        }

        runInAction(() => {
            this._authStore.setIsLoading(false);
        });
    }

    async logout(): Promise<void> {
        runInAction(() => {
            this._appStore.setIsLoading(true);
        });

        try {
            await this._authApi.logout();
        } catch (e) {
            Toast.push('Произошла ошибка.');
            runInAction(() => {
                this._appStore.setIsLoading(false);
            });
            return;
        }

        runInAction(() => {
            localStorage.removeItem('AccessToken');
            this._appStore.service.destroy();
            this._appStore.setIsLoading(false);
        });
    }

    async registration(): Promise<void> {
        runInAction(() => {
            this._authStore.setIsLoading(true);
        });

        const user = await this._authApi.registration({
            email: this._authStore.login,
            password: this._authStore.password,
            profession: this._authStore.profession,
            fullName: this._authStore.fullName,
            role: this._authStore.userRole,
            contacts: {
                phone: this._authStore.phone,
                email: this._authStore.login,
                vk: '',
                instagram: '',
            },
        });

        runInAction(() => {
            if (user) {
                this._authStore.isRegistration = true;
            }

            this._authStore.setIsLoading(false);
        });
    }

    destroy(): void {
        this._authStore.setPassword('');
        this._authStore.setLogin('');
        this._authStore.setFullName('');
        this._authStore.setPhone('');
        this._authStore.setProfession(null);
        this._authStore.setIsLoading(false);
        this._authStore.setIsError(false);
        this._authStore.setErrorMessage('');
        this._authStore.isRegistration = false;
        this._authStore.refContainer(null);
    }
}
