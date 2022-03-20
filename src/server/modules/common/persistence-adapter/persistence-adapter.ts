import { EntityManager, getManager } from 'typeorm';

export class PersistenceAdapter {
    public readonly _entityManager: EntityManager;

    constructor() {
        this._entityManager = getManager();
    }
}