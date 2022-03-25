import { HttpException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';
import { typeOrmConfig } from './configs/type-orm.config';
import { UserWebModule } from './modules/domains/users/user-web/user-web.module';
import { AuthWebModule } from './modules/domains/auth/auth-web/auth-web.module';
import { RoomsWebModule } from './modules/domains/rooms/rooms-web/rooms-web.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthWebModule,
        UserWebModule,
        RoomsWebModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useValue: new RavenInterceptor({
                filters: [
                    // Filter exceptions of type HttpException. Ignore those that
                    // have status code of less than 500
                    {
                        type: HttpException,
                        filter: (exception: HttpException) => exception.getStatus() < 500,
                    },
                ],
            }),
        },
    ],
})
export class AppModule {}
