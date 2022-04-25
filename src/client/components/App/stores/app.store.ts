import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../stores/root.store';
import { LargeUser } from '../../../../server/modules/domains/users/entities/user.entity';
import { RoleType } from '../../../../server/modules/domains/roles/entities/role.entity';
import { AppService } from './app.service';

export class AppStore {
    readonly service: AppService;

    userData: LargeUser = null;
    isAuth = false;
    currentRole: RoleType;
    isLoading = false;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new AppService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setIsAuth(value: boolean): void {
        this.isAuth = value;
    }
    
    setRole(value: RoleType): void {
        this.currentRole = value;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setUserData(data: LargeUser): void {
        this.userData = data;
    }
}