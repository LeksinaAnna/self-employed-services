import { AuthUseCase } from '../ports/auth.use-case';
import { UserUseCase } from '../../users/ports/user.use-case';
import {LargeUser, User, UserCreateProperties, WithToken} from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export class AuthService implements AuthUseCase {
    constructor(private readonly _userService: UserUseCase, private readonly _jwtService: JwtService) {}

    async login(authData: UserCreateProperties): Promise<UserProfile & WithToken> {
        const user = await this._userService.getUserByLogin(authData.login);
        const passwordEquals = await bcrypt.compare(authData.password, user.password);

        if (user && passwordEquals) {
            const token = await this.generateToken(user);
            return { ...user, ...token };
        }

        throw new UnauthorizedException('Логин или пароль введены неправильно');
    }

    async registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser> {
        // Проверяем есть ли пользователь с таким же логином
        const user = await this._userService.getUserByLogin(properties.login);

        if (user) {
            throw new BadRequestException('Пользователь с таким логином уже существует');
        }

        // Чтобы безопасно хранить пароль в базе, получаем его хэш
        const hashPassword = await bcrypt.hash(properties.password, 5);

        // Создание пользователя
        const createdUser = await this._userService.createUserAccount({
            ...properties,
            password: hashPassword,
        });

        await this.generateToken({ login: createdUser.login, userId: createdUser.userId })

        return createdUser;
    }

    async generateToken(user: Partial<User>) {
        const payload = { login: user.login, id: user.userId };

        return {
            token: this._jwtService.sign(payload),
        }
    }
}
