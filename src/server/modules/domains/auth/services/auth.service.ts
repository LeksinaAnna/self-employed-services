import { AuthUseCase } from '../ports/auth.use-case';
import { UserUseCase } from '../../users/ports/user.use-case';
import { UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

export class AuthService implements AuthUseCase {
    constructor(private readonly _userService: UserUseCase, private readonly _jwtService: JwtService) {}

    login(authData: UserCreateProperties): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    async registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<UserProfile> {
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

        return createdUser;
    }
}
