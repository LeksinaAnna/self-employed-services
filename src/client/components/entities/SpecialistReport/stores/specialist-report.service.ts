import { makeAutoObservable } from 'mobx';
import { RootStore } from '../../../../stores/root.store';
import { SpecialistReportStore } from './specialist-report.store';

export class SpecialistReportService {
    constructor(
        private readonly _specialistReportStore: SpecialistReportStore,
        private readonly _rootStore: RootStore,
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}