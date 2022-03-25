import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleType } from '../../modules/domains/roles/entities/role.entity';
import { TokenData } from '../../modules/domains/tokens/entities/token.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const user: TokenData = context.switchToHttp().getRequest().user;
        const roles: RoleType[] = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!roles) {
            return true;
        }

        if (!user) {
            throw new UnauthorizedException('Вы не авторизованы');
        }

        return user.roles.some(role => roles.includes(role));
    }

}