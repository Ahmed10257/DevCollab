import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { StrategyOptionsWithRequest } from 'passport-jwt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'refresh-jwt',
) {
    constructor(
        @Inject(refreshJwtConfig.KEY)
        private refrshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refrshJwtConfiguration.secret,
            ignoreExpiration: false,
            passReqToCallback: true,
        } as StrategyOptionsWithRequest);
    }


    validate(req: Request, payload: AuthJwtPayload) {
        const authorizationHeader = req.get('authorization');
        if (!authorizationHeader) {
            throw new Error('Authorization header is missing');
        }
        const refreshToken = authorizationHeader.replace('Bearer', '').trim();
        const userId = payload.sub;
        return this.authService.validateRefreshToken(userId, refreshToken);
    }
}