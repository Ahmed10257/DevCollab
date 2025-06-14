import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRepository } from 'src/repositories/team.repository';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  imports: [DrizzleModule]
})
export class TeamModule { }
