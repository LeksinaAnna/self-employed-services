import { makeAutoObservable } from 'mobx';
import moment from 'moment';
import { RootStore } from '../../../../stores/root.store';
import { LocationReport } from '../../../../../server/modules/domains/report/entities/report.entity';
import { RoomId } from '../../../../../server/modules/domains/rooms/entities/room.entity';
import { AdminReportService } from './admin-report.service';

export class AdminReportStore {
    startDate: string = moment().format('DD.MM.YYYY');
    finishDate: string = moment().add(1, 'days').format('DD.MM.YYYY');
    rooms: LocationReport[] = [];
    generalProfit = 0;
    hoveredRoom: RoomId = null;

    readonly service: AdminReportService;

    constructor(private readonly _rootStore: RootStore) {
        this.service = new AdminReportService(this._rootStore, this);

        makeAutoObservable(this, {}, { autoBind: true })
    }

    setStartDate(value: string): void {
        this.startDate = value;
    }

    setFinishDate(value: string): void {
        this.finishDate = value;
    }

    setHoveredRoom(value: RoomId): void {
        this.hoveredRoom = value;
    }

    setRooms(rooms: LocationReport[]): void {
        this.rooms = rooms;
    }

    setGeneralProfit(value: number): void {
        this.generalProfit = value;
    }
}