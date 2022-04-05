import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../stores/root.store';
import { LargeUser } from '../../../../server/modules/domains/users/entities/user.entity';
import { AppService } from './app.service';

export class AppStore {
    readonly service: AppService;

    userData: LargeUser = null;
    isAuth = false;
    isAdmin = false;
    isSpecialist = false;
    isUser = false;
    isLoading = false;
    appIsInit = false;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new AppService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    setAppIsInit(value: boolean): void {
        this.appIsInit = value;
    }

    setIsAuth(value: boolean): void {
        this.isAuth = value;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setUserData(data: LargeUser): void {
        this.userData = data;
    }
}