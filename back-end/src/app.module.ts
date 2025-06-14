import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { LoggerModule } from 'nestjs-pino';


@Module({
    imports: [
        DrizzleModule,
        UserModule, AuthModule,
        TeamModule,
        TaskModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'SYS:standard',
                        colorize: true,
                        ignore: 'pid,hostname',
                    },
                },
            },
        }),

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
