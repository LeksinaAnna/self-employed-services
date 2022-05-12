import { Injectable, NotFoundException } from '@nestjs/common';
import moment from 'moment';
import { ManyItem, QueryType, WithUpdater } from '../../../../../common/interfaces/common';
import { UserUseCase } from '../ports/user.use-case';
import {
    EmploymentSpecialist,
    Specialist,
    UserProfile,
    UserProfileCreateProperties,
    UserProfileUpdateProperties,
} from '../entities/user-profile.entity';
import {
    LargeUser,
    UserCreateProperties,
    UserEntity,
    UserEmail,
    User,
    UserWithPassword,
    UserId,
    UserWithDescription,
    UserUpdateProperties,
} from '../entities/user.entity';
import { RolesService } from '../../roles/services/roles.service';
import { RecordsAdapterService } from '../../records/services/adapters/records-adapter.service';
import { UserProfileService } from './user-profile.service';
import { UserAdapterService } from './adapters/user-adapter.service';

/**
 *
 * Сервис отвечающий за взаимодействие с пользователями
 */
@Injectable()
export class UserService implements UserUseCase {
    constructor(
        private readonly _userPort: UserAdapterService,
        private readonly _userProfileService: UserProfileService,
        private readonly _rolesService: RolesService,
        private readonly _recordsPort: RecordsAdapterService,
    ) {}

    async getEmploymentOfSpecialist(userId: string, { start_date }: QueryType): Promise<EmploymentSpecialist> {
        const specialist = await this._userPort.getUserById(userId);

        // Проверяем существует ли специалист
        if (!specialist) {
            throw new NotFoundException('Специалист не найден');
        }

        // Получаем все записи специалиста на дату из query
        const records = await this._recordsPort.getRecordsBySpecialistId(userId, start_date);

        return records.map(record => {
            const recordDate = moment(record.recordDate);
            const startTime = recordDate.unix();
            const endTime = moment(recordDate).add(record.service.duration, 'milliseconds').unix();

            return { startTime, endTime }
        });
    }

    /**
     * Метод регистрации нового пользователя
     */
    public async createUserAccount(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser> {
        // Регаем аккаунт
        const accountEntity = new UserEntity({
            password: properties.password,
            email: properties.email,
        });

        const account = await this._userPort.createAccount(accountEntity);
        const role = await this._rolesService.assignRoleToUser(account.accountId, properties.role);
        // Создаем профиль\инфу о пользователе
        const profile = await this._userProfileService.createUserProfile({
            ...properties,
            profileId: accountEntity.accountId,
        });

        return {
            accountId: account.accountId,
            email: account.email,
            profile,
            roles: [role],
            created: account.created,
        };
    }

    async getUserByLogin(email: UserEmail): Promise<LargeUser> {
        return await this._userPort.getUserByLogin(email);
    }

    async getAccount(email: UserEmail): Promise<User & UserWithPassword> {
        return await this._userPort.getAccount(email);
    }

    async updateUserInfo(userId: UserId, properties: UserProfileUpdateProperties): Promise<UserProfile> {
        const user = await this._userPort.getUserById(userId);

        if (!user) {
            throw new NotFoundException('Пользователя не существует');
        }

        return await this._userProfileService.updateUserProfile(userId, properties);
    }

    async getUserById(userId: UserId): Promise<LargeUser> {
        return await this._userPort.getUserById(userId);
    }

    async getSpecialistsForUser(query: QueryType): Promise<ManyItem<Specialist>> {
        return await this._userPort.getSpecialistsForUser(query);
    }

    async getSpecialistsForAdmin(query: QueryType): Promise<ManyItem<LargeUser & UserWithDescription>> {
        return await this._userPort.getSpecialistsForAdmin(query, true);
    }

    async updateSpecialist(
        properties: UserUpdateProperties & WithUpdater,
        specialistId: UserId,
    ): Promise<LargeUser & UserWithDescription> {
        const specialist = await this._userPort.getUserById(specialistId);

        if (!specialist) {
            throw new NotFoundException('обновляемый пользователь не найден');
        }

        const account = await this._userPort.getAccount(specialist.email);

        const updatedEntity = new UserEntity({
            ...account,
            ...properties,
            modifiedBy: properties.updater,
        });

        await this._userPort.saveUser(updatedEntity);

        return specialist;
    }
}
