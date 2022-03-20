import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_NOT_AUTH_KEY } from '../decorators/not-auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // Проверяем висит ли декоратор NotAuth
        const isNotAuth = this.reflector.getAllAndOverride(IS_NOT_AUTH_KEY, [context.getHandler(), context.getClass()]);

        if (isNotAuth) {
            // Если декоратор есть, то разрешаем запрос
            return true;
        }

        const authHeader = request?.headers?.authorization;
        const bearer = authHeader?.split(' ')[0];
        const token = authHeader?.split(' ')[1];

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException(`Вы не авторизованы`);
        }

        try {
            request.user = this.jwtService.verify(token);
        } catch (e) {
            console.log(`[ERROR] - ${e.message}`)
            throw new UnauthorizedException(`Вы не авторизованы`);
        }

        return true;
    }
}
