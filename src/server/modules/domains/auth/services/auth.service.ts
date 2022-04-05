import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthUseCase } from '../ports/auth.use-case';
import { LargeUser, UserCreateProperties } from '../../users/entities/user.entity';
import { UserProfileCreateProperties } from '../../users/entities/user-profile.entity';
import { RefreshToken, Tokens } from '../../tokens/entities/token.entity';
import { UserService } from '../../users/services/user.service';
import { TokensService } from '../../tokens/services/tokens.service';

@Injectable()
export class AuthService implements AuthUseCase {
    constructor(private readonly _userService: UserService, private readonly _tokensService: TokensService) {
    }

    async refreshAuthToken(refreshToken: RefreshToken): Promise<Tokens> {
        const tokenData = this._tokensService.validateToken(refreshToken);
        const tokens = this._tokensService.generateTokens({
            userId: tokenData.userId,
            email: tokenData.email,
            roles: tokenData.roles
        });
        await this._tokensService.saveToken(tokenData.userId, tokens.refreshToken);

        return tokens;
    }

    async login(authData: UserCreateProperties): Promise<LargeUser & Tokens> {
        const user = await this._userService.getAccount(authData.email);

        if (!user) {
            throw new UnauthorizedException('Такой пользователь не зарегистрирован в системе');
        }
        const userInfo = await this._userService.getUserByLogin(authData.email);

        // Проверяем совпадают ли хэш пароля который ввели с хэшем пароля из базы
        const passwordEquals = await bcrypt.compare(authData.password, user.password);

        // Если пароли совпали
        if (passwordEquals) {
            // Получаем пару токенов
            const roles = userInfo.roles.map(role => role.value);
            const tokens = this._tokensService.generateTokens({
                userId: user.accountId,
                email: user.email,
                roles
            });
            await this._tokensService.saveToken(user.accountId, tokens.refreshToken);

            return { ...tokens, ...userInfo };
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
        const hashPassword = await bcrypt.hash(properties.password, 3);

        // Создание пользователя
        const createdUser = await this._userService.createUserAccount({
            ...properties,
            password: hashPassword,
        });

        // Получаем JWT токены
        const roles = createdUser?.roles.map(role => role.value);
        const tokens = await this._tokensService.generateTokens({
            userId: createdUser.accountId,
            email: createdUser.email,
            roles,
        });
        await this._tokensService.saveToken(createdUser.accountId, tokens.refreshToken);

        return { ...createdUser, ...tokens };
    }

    async logout(authToken: string): Promise<void> {
        await this._tokensService.removeToken(authToken);
    }
}
