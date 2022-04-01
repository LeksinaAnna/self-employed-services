import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { ProfessionType } from '../../../../../server/modules/domains/users/entities/user-profile.entity';

export class AuthStore {
    isLoginModal: boolean;
    isRegistrationModal: boolean;

    login = '';
    password = '';
    profession: ProfessionType;
    fullName: string;

    constructor(private readonly _rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setLogin(value: string): void {
        this.login = value;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    setProfession(profession: ProfessionType): void {
        this.profession = profession;
    }

    setIsLoginModal(value: boolean): void {
        this.isLoginModal = value;
    }

    setIsRegistrationModal(value: boolean): void {
        this.isRegistrationModal = value;
    }
}