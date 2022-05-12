import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserAdapterService } from '../services/adapters/user-adapter.service';
import { UserProfileAdapterService } from '../services/adapters/user-profile-adapter.service';
import { RolesService } from '../../roles/services/roles.service';
import { RolesAdapterService } from '../../roles/services/adapters/roles-adapter.service';
import { RecordsAdapterService } from '../../records/services/adapters/records-adapter.service';
import { UserWebController } from './user-web.controller';
import { UserWebAdminController } from './user-web-admin.controller';

@Module({
    providers: [
        UserService,
        UserProfileService,
        UserAdapterService,
        UserProfileAdapterService,
        RolesService,
        RolesAdapterService,
        RecordsAdapterService
    ],
    controllers: [UserWebController, UserWebAdminController],
    exports: [UserService, UserAdapterService, UserProfileAdapterService],
})
export class UserWebModule {}
