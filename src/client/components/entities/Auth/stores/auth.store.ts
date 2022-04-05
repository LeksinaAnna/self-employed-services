import { makeAutoObservable } from 'mobx';
import { ValidationContainer } from '@skbkontur/react-ui-validations';
import { RoleType } from '../../../../../server/modules/domains/roles/entities/role.entity';
import { RootStore } from '../../../../stores/root.store';
import { Nullable } from '../../../../../common/interfaces/common';
import {
    ProfessionType,
    ProfessionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { AuthService } from './auth.service';

export class AuthStore {
    isLoading = false;
    _isError = false;
    errorMessage = '';
    isRegistration = false;

    login = '';
    password = '';
    profession: ProfessionType;
    fullName = '';
    phone = '';
    userRole: RoleType = 'SPECIALIST';

    container: Nullable<ValidationContainer> = null;

    readonly service: AuthService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new AuthService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get userProfessionList(): string[] {
        const profArr: ProfessionType[] = ['browist', 'barber', 'lashmaker', 'manicurist'];
        return profArr.map(prof => ProfessionTypeDict[prof]);
    }

    get isError(): boolean {
        return this._isError;
    }

    get redirectPath(): string {
        if (this._rootStore.appStore.isAdmin) {
            return 'admin/locations';
        }

        if (this._rootStore.appStore.isSpecialist) {
            return 'specialist/services';
        }

        if (this._rootStore.appStore.isUser) {
            return 'user/records';
        }
    }

    setIsError(value: boolean): void {
        this._isError = value;
    }

    setErrorMessage(value: string): void {
        this.errorMessage = value;
    }

    refContainer(ref: ValidationContainer): void {
        this.container = ref;
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setPhone(value: string): void {
        this.phone = value;
    }

    setLogin(value: string): void {
        this.login = value;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    setFullName(value: string): void {
        this.fullName = value;
    }

    setProfession(profession: string): void {
        Object.keys(ProfessionTypeDict).forEach((profKey: ProfessionType) => {
            if (ProfessionTypeDict[profKey] === profession) {
                this.profession = profKey;
            }
        });
    }
}
