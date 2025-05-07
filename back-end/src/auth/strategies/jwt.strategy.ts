import { Injectable, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

// This strategy is used to validate the JWT token sent in the request headers. 
// It extracts the token from the Authorization header and verifies it using the secret key 
// defined in the configuration. If the token is valid, it calls the validate method to retrieve 
// the user information associated with the token.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private jwtConfiguration: ConfigType<typeof jwtConfig>,
        private authService: AuthService,
    ) {
        if (!jwtConfiguration.secret) {
            throw new Error('JWT secret is not defined in the configuration.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // defines where to extract the JWT token from the request
            secretOrKey: jwtConfiguration.secret,
            ignoreExpiration: false, // if true, the token will not expire
        });
    }

    validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}