import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as schema from './schema/schema';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseURL = configService.get<string>('DATABASE_URL');
        const pool = mysql.createPool({
          uri: databaseURL,
        });
        return drizzle(pool, { schema, mode: 'default' }) as MySql2Database<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule { }
