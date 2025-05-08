export class CreateTaskDto {
    name!: string;
    description!: string;
    priorityId!: number;
    teamId!: number | null;
    assignedTo!: number | null;
    createdBy!: number;
}
