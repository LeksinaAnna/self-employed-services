import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { LargeUser, UserWithDescription } from '../../../../../server/modules/domains/users/entities/user.entity';
import { TableItem } from '../../../ui/Tables/TableItems/TableWithItems';
import { SpecialistsService } from './specialists.service';

export class SpecialistsStore {
    isLoading = false
    specialists: Array<LargeUser & UserWithDescription> = [];
    count = 0;
    skip = 0;
    take = 10;
    searchValue = '';

    isInfoModal = false;
    selectedUser: LargeUser & UserWithDescription;

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

    setSpecialists(specialists: Array<LargeUser & UserWithDescription>): void {
        this.specialists = specialists;
    }

    openInfoModal(item: TableItem): void {
        this.isInfoModal = true;
        this.selectedUser = this.specialists.find(specialist => specialist.accountId === item.id);
    }

    closeInfoModal(): void {
        this.isInfoModal = false;
        this.selectedUser = null;
    }
}