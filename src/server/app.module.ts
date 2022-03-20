import { HttpException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/type-orm.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RavenInterceptor } from 'nest-raven';
import { UserWebModule } from './modules/domains/users/user-web/user-web.module';
import { AuthWebModule } from './modules/domains/auth/auth-web/auth-web.module';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UserWebModule, AuthWebModule],
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
