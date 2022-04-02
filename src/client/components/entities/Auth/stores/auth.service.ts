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
            password: this._authStore.password
        });

        if (user && accessToken) {
            localStorage.setItem('AccessToken', accessToken);
            runInAction(() => {
                this._appStore.setUserData(user);
                this._appStore.setIsAuth(true);
                this._authStore.setIsLoginModal(false);
            });
        }

        runInAction(() => {
            this._authStore.setIsLoading(false);
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
                instagram: ''
            }
        });

        if (user) {
            Toast.push('Пользователь успешно зарегистрирован')
            this._authStore.setIsLoading(false);
            this._authStore.setIsRegistrationModal(false);
        }

        runInAction(() => {
            this._authStore.setIsLoading(false);
        });
    }

    destroy(): void {
        this._authStore.password = '';
        this._authStore.login = '';
        this._authStore.fullName = '';
        this._authStore.phone = '';
        this._authStore.profession = null;
        this._authStore.isLoading = false;
    }

    openLoginModal(): void {
        this._authStore.setIsLoginModal(true);
    }

    closeLoginModal(): void {
        this._authStore.setIsLoginModal(false);
    }

    openRegistrationModal(): void {
        this._authStore.setIsRegistrationModal(true);
    }

    closeRegistrationModal(): void {
        this._authStore.setIsRegistrationModal(false);
    }
}