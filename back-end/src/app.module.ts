import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirzzleModule } from './dirzzle/dirzzle.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';


@Module({
    imports: [
        DirzzleModule,
        UserModule, AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TeamModule,
        TaskModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
