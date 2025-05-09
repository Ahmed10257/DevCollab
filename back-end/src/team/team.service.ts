import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repository';
import { Logger } from 'nestjs-pino';

@Injectable()
export class TeamService {
    constructor(private teamRepository: TeamRepository, private readonly logger: Logger) { }

    findAll() {
        return this.teamRepository.findAll();
    }

    findById(id: number) {
        return this.teamRepository.findById(id);
    }

    create(team: any) {
        this.logger.log({ msg: 'Creating team: ', team }, 'TeamService');
        return this.teamRepository.create(team);
    }

    update(id: number, team: any) {
        this.logger.log({ msg: 'Updating team: ', team }, 'TeamService');
        return this.teamRepository.update(id, team);
    }

    delete(id: number) {
        this.logger.log({ msg: 'Deleting team with id: ', id }, 'TeamService');
        return this.teamRepository.delete(id);
    }

    findByName(name: string) {
        return this.teamRepository.findByName(name);
    }

    findByLeaderId(leaderId: number) {
        return this.teamRepository.findByLeaderId(leaderId);
    }
}
