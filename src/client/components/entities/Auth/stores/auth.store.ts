import { makeAutoObservable } from 'mobx';
import { RoleType } from '../../../../../server/modules/domains/roles/entities/role.entity';
import { RootStore } from '../../../../stores/root.store';
import {
    ProfessionType,
    ProfessionTypeDict,
} from '../../../../../server/modules/domains/users/entities/user-profile.entity';
import { AuthService } from './auth.service';

export class AuthStore {
    isLoginModal = false;
    isRegistrationModal = false;
    isLoading = false;

    login = '';
    password = '';
    profession: ProfessionType;
    fullName = '';
    phone = '';
    userRole: RoleType = 'SPECIALIST';

    readonly service: AuthService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new AuthService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true });
    }

    get userProfessionList(): string[] {
        const profArr: ProfessionType[] = ['browist', 'barber', 'lashmaker', 'manicurist'];
        return profArr.map(prof => ProfessionTypeDict[prof]);
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

    setIsLoginModal(value: boolean): void {
        this.isLoginModal = value;
    }

    setIsRegistrationModal(value: boolean): void {
        this.isRegistrationModal = value;
    }
}
