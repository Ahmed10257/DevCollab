import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeRepository } from '../repositories/type.repository';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private readonly typeRepository: TypeRepository) {}

  async findAll(categoryId?: number) {
    if (categoryId) {
      return await this.typeRepository.findByCategoryId(categoryId);
    }
    return await this.typeRepository.findAll();
  }

  async findOne(id: number) {
    const type = await this.typeRepository.findById(id);
    if (!type) {
      throw new NotFoundException(`Type with ID ${id} not found`);
    }
    return type;
  }

  async findByCategoryId(categoryId: number) {
    return await this.typeRepository.findByCategoryId(categoryId);
  }

  async create(createTypeDto: CreateTypeDto) {
    return await this.typeRepository.create(createTypeDto);
  }

  async update(id: number, updateTypeDto: UpdateTypeDto) {
    const type = await this.findOne(id);
    return await this.typeRepository.update(id, updateTypeDto);
  }

  async remove(id: number) {
    const type = await this.findOne(id);
    return await this.typeRepository.delete(id);
  }
}
