import { CreateUserDto } from './../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Injectable, Body } from '@nestjs/common';
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

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService, // Used to create JWT tokens, it comes from the @nestjs/jwt package
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

        // optional: send verification email here

        return { message: 'User created' };
    }

    async login(dto: LoginDto) {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            this.logger.error({ msg: 'Wrong Password', user }, 'AuthService');
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email }; // the payload is the data that will be encoded in the JWT token
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload);

        // store hashed refresh token in DB
        await this.userService.updateHashedRefreshToken(user.id, refreshToken);
        this.logger.log({ msg: 'User logged in', user }, 'AuthService');
        return { accessToken, refreshToken };
    }

    async validateJwtUser(userId: number) {
        const user = await this.userService.findOne(userId);
        if (!user) throw new UnauthorizedException('User not found!');
        const currentUser: CurrentUser = { id: user.id, role: user.role };
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
        if (!user || !user.hashedRefreshToken)
            throw new UnauthorizedException('Invalid Refresh Token');

        const refreshTokenMatches = await argon2.verify(
            user.hashedRefreshToken,
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

}
