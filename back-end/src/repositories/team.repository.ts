import { Injectable, Inject } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { teams } from '../drizzle/schema/team.schema';
import { DrizzleDB } from "../drizzle/types/drizzle";
import { CreateTeamDto } from "../team/dto/create-team.dto";
import { DRIZZLE } from "../drizzle/drizzle.module";
import {
    deleteReturningById,
    insertReturning,
    updateReturning,
} from '../drizzle/utils/mysql-helpers';

@Injectable()
export class TeamRepository {
    constructor(@Inject(DRIZZLE) private db: DrizzleDB) { }

    findAll() {
        return this.db.query.teams.findMany();
    }

    findById(id: number) {
        return this.db.select().from(teams).where(eq(teams.id, id)).execute();
    }

    findByName(name: string) {
        return this.db.select().from(teams).where(eq(teams.name, name)).execute();
    }

    findByLeaderId(leaderId: number) {
        return this.db.select().from(teams).where(eq(teams.leaderId, leaderId)).execute();
    }

    create(team: CreateTeamDto) {
        return insertReturning(this.db, teams, team);
    }

    update(id: number, team: Record<string, unknown>) {
        return updateReturning(this.db, teams, eq(teams.id, id), team);
    }

    delete(id: number) {
        return deleteReturningById(this.db, teams, id);
    }
}
