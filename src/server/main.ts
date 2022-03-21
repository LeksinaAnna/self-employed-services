import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv';
import { AppModule } from './app.module';
import { HttpFilter } from './nest-decorators/filters/http-exceptions.filter';
import { AuthGuard } from './nest-decorators/guards/auth.guards';
import { NotFoundInterceptor } from './nest-decorators/interceptors/not-found.interceptor';
import cookieParser from 'cookie-parser';

const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

    const reflector = app.get(Reflector);

    if (process.env.HTTP_PROXY) {
        // Proxy logic
    }

    app.use(cookieParser());

    // Auth Guards
    // app.useGlobalGuards(new AuthGuard(reflector));

    // HTTP Errors
    app.useGlobalInterceptors(new NotFoundInterceptor());
    app.useGlobalFilters(new HttpFilter());
    app.setGlobalPrefix('api/v1/')
    await app.listen(3003, () => {
        console.log('[SERVER_INFO] - server was be started')
    });
};

// @ts-ignore
bootstrap();
