import { EntityManager, getManager } from 'typeorm';

/**
 *
 * Общий класс под адаптеры, для того, чтобы для каждого адаптера не получать entityManager
 */
export class PersistenceAdapter {
    public readonly _entityManager: EntityManager;

    constructor() {
        this._entityManager = getManager();
    }
}