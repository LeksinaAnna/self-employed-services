import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RefreshToken, Token } from '../entities/token.entity';
import { UserId } from '../../users/entities/user.entity';

@Entity({ name: 'tokens', schema: 'public' })
export class TokenOrmEntity implements Token {
    @PrimaryColumn({ name: 'token_id', type: 'uuid' })
    tokenId: string;

    @Column({ name: 'refresh_token' })
    refreshToken: RefreshToken;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: UserId;

    @Column({ name: 'created', type: 'time with time zone' })
    created: string;
}