import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../../../stores/root.store';
import { AuthApi } from '../../../client-tools/api/entities/auth/auth-api';
import { Role } from '../../../../server/modules/domains/roles/entities/role.entity';
import { LargeUser } from '../../../../server/modules/domains/users/entities/user.entity';
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
        let user: LargeUser;

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
                this._appStore.setIsAuth(true);
                this._appStore.setUserData(user);
                this.setRole(user.roles);
            });
        }

        runInAction(() => {
            this._appStore.setIsLoading(false);
        });
    }

    setRole(userRoles: Role[]): void {
        const roles = userRoles.map(role => role.value);
        if (roles.includes('ADMIN')) {
            this._appStore.isAdmin = true;
        }

        if (roles.includes('SPECIALIST')) {
            this._appStore.isSpecialist = true;
        }

        if (roles.includes('USER')) {
            this._appStore.isUser = true;
        }
    }

    destroy(): void {
        this._appStore.setIsAuth(false);
        this._appStore.setUserData(null);
    }
}