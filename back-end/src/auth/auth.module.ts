import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from './config/refresh-jwt.config';
import adConfig from './config/ad.config';
import { UserModule } from 'src/user/user.module';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import { PassportModule } from '@nestjs/passport';
import { AdService } from './ad/ad.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AdService, JwtStrategy, RefreshJwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(adConfig),
    UserModule,
  ],
  exports: [AuthService],
})
export class AuthModule { }
