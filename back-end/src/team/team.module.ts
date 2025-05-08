import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRepository } from 'src/repositories/team.repository';
import { DirzzleModule } from 'src/dirzzle/dirzzle.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamRepository],
  imports: [DirzzleModule]
})
export class TeamModule { }
