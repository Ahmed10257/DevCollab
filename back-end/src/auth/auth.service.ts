import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './types/current-user';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { ConfigType } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { Inject } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Logger } from 'nestjs-pino';
import { AdService } from './ad/ad.service';
import { Role } from './enums/role.enum';
import { users } from 'src/drizzle/schema/user.schema';

type DbUser = typeof users.$inferSelect;

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly adService: AdService,
        @Inject(refreshJwtConfig.KEY)
        private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
        private readonly logger: Logger,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const user = await this.userService.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return { message: 'User created' };
    }

    async login(dto: LoginDto) {
        const principal = dto.principal;
        if (!principal) {
            throw new UnauthorizedException('userName or email is required');
        }

        let adUser;
        try {
            adUser = await this.adService.authenticate(principal, dto.password);
        } catch (error) {
            this.logger.warn(
                { msg: 'AD authentication failed', principal, error },
                'AuthService',
            );
            throw new UnauthorizedException('Invalid credentials');
        }

        let isAdmin = false;
        try {
            isAdmin = await this.adService.isUserInGroup(
                principal,
                this.adService.adminGroup,
            );
        } catch (error) {
            this.logger.warn(
                { msg: 'AD group membership check failed', principal, error },
                'AuthService',
            );
        }
        const role = isAdmin ? Role.ADMIN : Role.USER;
        const user = await this.userService.upsertFromAd(adUser, role);

        const { accessToken, refreshToken } = await this.generateTokens(user.id);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(user.id, hashedRefreshToken);

        this.logger.log({ msg: 'User logged in via AD', userId: user.id, role }, 'AuthService');

        return {
            accessToken,
            refreshToken,
            user: this.toPublicUser(user),
        };
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) throw new UnauthorizedException('User not found!');
        const currentUser: CurrentUser = {
            id: user.id,
            role: (user.role as Role) ?? Role.USER,
        };
        return currentUser;
    }

    async refreshToken(userId: number) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
        return {
            id: userId,
            accessToken,
            refreshToken,
        };
    }

    async validateRefreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.refreshToken)
            throw new UnauthorizedException('Invalid Refresh Token');

        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches)
            throw new UnauthorizedException('Invalid Refresh Token');

        return { id: userId };
    }

    async generateTokens(userId: number) {
        const payload: AuthJwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }

    async signOut(userId: number) {
        await this.userService.updateHashedRefreshToken(userId, null);
        this.logger.log({ msg: 'User signed out', userId }, 'AuthService');
        return { message: 'User signed out' };
    }

    private toPublicUser(user: DbUser) {
        const { password, refreshToken, ...publicUser } = user;
        return publicUser;
    }
}
