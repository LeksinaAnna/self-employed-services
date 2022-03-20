import {Controller, Get} from "@nestjs/common";

@Controller('users')
export class UserWebController {
    @Get('/')
    async getUsers() {
        return {
            info: 'GOOOOOOD'
        }
    }
}