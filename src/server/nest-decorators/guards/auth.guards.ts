import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_NOT_AUTH_KEY } from '../decorators/not-auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const isNotAuth = this.reflector.getAllAndOverride<boolean>(IS_NOT_AUTH_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isNotAuth || request.headers['x-key']) {
            return true;
        }

        throw new UnauthorizedException(`AuthGuard: Unauthorized.`);
    }
}
