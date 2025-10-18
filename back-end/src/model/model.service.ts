import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelRepository } from '../repositories/model.repository';

@Injectable()
export class ModelService {
  constructor(private readonly modelRepository: ModelRepository) {}

  async create(createModelDto: CreateModelDto) {
    return this.modelRepository.create(createModelDto);
  }

  async findAll(manufacturerId?: number) {
    return this.modelRepository.findAll(manufacturerId);
  }

  async findOne(id: number) {
    const model = await this.modelRepository.findOne(id);
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    await this.findOne(id); // Validate existence
    return this.modelRepository.update(id, updateModelDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Validate existence
    return this.modelRepository.remove(id);
  }
}
