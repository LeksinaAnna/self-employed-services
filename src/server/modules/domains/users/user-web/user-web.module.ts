import {Module} from "@nestjs/common";
import {UserWebController} from "./user-web.controller";

@Module({
    providers: [],
    controllers: [UserWebController]
})
export class UserWebModule {}