import { makeAutoObservable } from 'mobx';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';

export class RootStore {
    constructor(readonly commonApi: CommonApiStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}