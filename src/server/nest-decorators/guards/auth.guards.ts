import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_NOT_AUTH_KEY } from '../decorators/not-auth';
import { JwtService } from '@nestjs/jwt';
import { createQueryBuilder } from 'typeorm';
import { TokenOrmEntity } from '../../modules/domains/tokens/orm-entities/token-orm.entity';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        // Проверяем висит ли декоратор NotAuth
        const isNotAuth = this.reflector.getAllAndOverride(IS_NOT_AUTH_KEY, [context.getHandler(), context.getClass()]);

        if (isNotAuth) {
            // Если декоратор есть, то разрешаем запрос
            return true;
        }

        // Вытаскиваем access токен из хедеров - Bearer dasfsafsvasva.fasfsafa
        const authHeader = request?.headers?.authorization;
        const accessToken = authHeader?.split(' ')[1];

        // Вытаскивем рефреш токен из куков
        const { refreshToken } = request?.cookies;

        // Смотрим если нет AccessToken или RefreshToken - возвращаем ошибку
        if (!refreshToken || !accessToken) {
            throw new UnauthorizedException(`Вы не авторизованы`);
        }

        // Проверяем произвелся ли вход с другого устройства
        await this.validateRefreshToken(refreshToken, response);

        // Если AccessToken есть то пытаемся его провалидировать
        request.user = this.validateAccessToken(accessToken);
        return true;
    }

    validateAccessToken(token: string): object {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            console.log(`[ERROR] - ${e.message}`);
            throw new UnauthorizedException(`AccessToken истёк.`);
        }
    }

    async validateRefreshToken(refreshToken: string, response: Response): Promise<void> {
        const token = await createQueryBuilder(TokenOrmEntity, 'token')
            .where(`token.refreshToken = :refreshToken`, { refreshToken })
            .getOne();

        if (!token) {
            response.clearCookie('refreshToken');
            throw new UnauthorizedException(`Авторизация сброшена. Произведен вход с другого устройства.`);
        }
    }
}
