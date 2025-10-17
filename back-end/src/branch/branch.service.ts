import { Injectable, NotFoundException } from '@nestjs/common';
import { BranchesRepository } from '../repositories/branch.repository';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
    constructor(private readonly branchesRepository: BranchesRepository) {}

    async findAll() {
        return await this.branchesRepository.findAll();
    }

    async findOne(id: number) {
        const branch = await this.branchesRepository.findById(id);
        if (!branch) {
            throw new NotFoundException(`Branch with ID ${id} not found`);
        }
        return branch;
    }

    async create(createBranchDto: CreateBranchDto) {
        const result = await this.branchesRepository.create(createBranchDto.name);
        return result[0];
    }

    async update(id: number, updateBranchDto: UpdateBranchDto) {
        await this.findOne(id); // Check if exists
        const result = await this.branchesRepository.update(id, updateBranchDto.name!);
        return result[0];
    }

    async remove(id: number) {
        await this.findOne(id); // Check if exists
        const result = await this.branchesRepository.delete(id);
        return result[0];
    }
}
