import { JwtService } from '@nestjs/jwt';
import cookieParser from 'cookie-parser';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv';
import { AppModule } from './app.module';
import { HttpFilter } from './nest-decorators/filters/http-exceptions.filter';
import { NotFoundInterceptor } from './nest-decorators/interceptors/not-found.interceptor';
import { AuthGuard } from './nest-decorators/guards/auth.guard';
import { RolesGuard } from './nest-decorators/guards/roles.guard';

const bootstrap = async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

    if (process.env.HTTP_PROXY) {
        // Proxy logic
    }

    app.use(cookieParser());

    // Auth Guards
    const reflector = app.get(Reflector);
    const jwtService = app.get(JwtService);
    app.useGlobalGuards(new AuthGuard(jwtService, reflector));
    app.useGlobalGuards(new RolesGuard(reflector));

    // HTTP Errors
    app.useGlobalInterceptors(new NotFoundInterceptor());
    app.useGlobalFilters(new HttpFilter());
    app.setGlobalPrefix('api/v1/');

    const port = process.env.BACKEND_PORT || 3003;
    await app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`[SERVER_INFO] - server was be started on ${port} port`);
    });
};

/*eslint-disable*/
bootstrap().then();
