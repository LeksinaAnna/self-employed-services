import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { LargeUser } from '../../../../../server/modules/domains/users/entities/user.entity';
import { SpecialistsService } from './specialists.service';

export class SpecialistsStore {
    isLoading = false
    specialists: LargeUser[];
    count = 0;
    skip = 0;
    take = 10;
    searchValue = '';

    isInfoModal = false;
    selectedUser: LargeUser;

    readonly service: SpecialistsService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new SpecialistsService(this._rootStore, this);
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setIsLoading(value: boolean): void {
        this.isLoading = value;
    }

    setCount(value: number): void {
        this.count = value;
    }

    setSearchValue(value: string): void {
        this.searchValue = value;
    }

    setSkipCount(value: number): void {
        this.skip = value;
    }

    setSpecialists(specialists: LargeUser[]): void {
        this.specialists = specialists;
    }

    openInfoModal(user: LargeUser): void {
        this.isInfoModal = true;
        this.selectedUser = user;
    }

    closeInfoModal(): void {
        this.isInfoModal = false;
        this.selectedUser = null;
    }
}