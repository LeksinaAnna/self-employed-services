import { Module } from '@nestjs/common';
import { UserWebController } from './user-web.controller';
import { UserService } from '../services/user.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserAdapterService } from '../services/adapters/user-adapter.service';
import { UserProfileAdapterService } from '../services/adapters/user-profile-adapter.service';
import { RolesService } from '../../roles/services/roles.service';
import { RolesAdapterService } from '../../roles/services/adapters/roles-adapter.service';

@Module({
    providers: [
        UserService,
        UserProfileService,
        UserAdapterService,
        UserProfileAdapterService,
        RolesService,
        RolesAdapterService
    ],
    controllers: [UserWebController],
    exports: [UserService],
})
export class UserWebModule {
}
