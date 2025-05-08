import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repository';

@Injectable()
export class TeamService {
    constructor(private teamRepository: TeamRepository) { }

    findAll() {
        return this.teamRepository.findAll();
    }

    findById(id: number) {
        return this.teamRepository.findById(id);
    }

    create(team: any) {
        return this.teamRepository.create(team);
    }

    update(id: number, team: any) {
        return this.teamRepository.update(id, team);
    }

    delete(id: number) {
        return this.teamRepository.delete(id);
    }

    findByName(name: string) {
        return this.teamRepository.findByName(name);
    }

    findByLeaderId(leaderId: number) {
        return this.teamRepository.findByLeaderId(leaderId);
    }
}
