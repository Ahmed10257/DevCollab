import { teams } from '../dirzzle/schema/team.schema';
import { Injectable } from "@nestjs/common";
import { DrizzleDB } from "src/dirzzle/types/drizzle";
import { CreateTeamDto } from "src/team/dto/create-team.dto";
import { eq } from "drizzle-orm";
import { DRIZZLE } from "src/dirzzle/dirzzle.module";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";


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
        return this.db.insert(teams).values(team).returning();
    }

    update(id: number, team: any) {
        return this.db.update(teams).set(team).where(eq(teams.id, id)).returning();
    }

    delete(id: number) {
        return this.db.delete(teams).where(eq(teams.id, id)).returning();
    }
}