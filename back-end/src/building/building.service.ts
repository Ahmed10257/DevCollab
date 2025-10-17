import { Injectable, NotFoundException } from '@nestjs/common';
import { BuildingsRepository } from '../repositories/building.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingService {
    constructor(private readonly buildingsRepository: BuildingsRepository) {}

    async findAll() {
        return await this.buildingsRepository.findAll();
    }

    async findByBranch(branchId: number) {
        return await this.buildingsRepository.findByBranchId(branchId);
    }

    async findOne(id: number) {
        const building = await this.buildingsRepository.findById(id);
        if (!building) {
            throw new NotFoundException(`Building with ID ${id} not found`);
        }
        return building;
    }

    async create(createBuildingDto: CreateBuildingDto) {
        const result = await this.buildingsRepository.create(
            createBuildingDto.name,
            createBuildingDto.branchId
        );
        return result[0];
    }

    async update(id: number, updateBuildingDto: UpdateBuildingDto) {
        await this.findOne(id); // Check if exists
        const result = await this.buildingsRepository.update(
            id,
            updateBuildingDto.name!,
            updateBuildingDto.branchId
        );
        return result[0];
    }

    async remove(id: number) {
        await this.findOne(id); // Check if exists
        const result = await this.buildingsRepository.delete(id);
        return result[0];
    }
}
