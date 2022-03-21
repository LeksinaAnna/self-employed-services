import { AuthUseCase } from '../ports/auth.use-case';
import { UserUseCase } from '../../users/ports/user.use-case';
import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfile, UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { TokensUseCase } from '../../tokens/ports/tokens.use-case';
import { Tokens } from '../../tokens/entities/token.entity';

export class AuthService implements AuthUseCase {
    constructor(private readonly _userService: UserUseCase, private readonly _tokensService: TokensUseCase) {}

    async login(authData: UserCreateProperties): Promise<UserProfile & Tokens> {
        const user = await this._userService.getUserByLogin(authData.email);
        const passwordEquals = await bcrypt.compare(authData.password, user.password);

        if (user && passwordEquals) {
            const tokens = await this._tokensService.generateTokens(user);
            return { ...user, ...tokens };
        }

        throw new UnauthorizedException('Логин или пароль введены неправильно');
    }

    async registration(properties: UserProfileCreateProperties & UserCreateProperties): Promise<LargeUser & Tokens> {
        // Проверяем есть ли пользователь с таким же логином
        const user = await this._userService.getUserByLogin(properties.email);

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

        // Получаем JWT токены
        const tokens = await this._tokensService.generateTokens(createdUser);

        return { ...createdUser, ...tokens };
    }

    async logout(authToken: string): Promise<void> {
        await this._tokensService.removeToken(authToken);
    }
}
