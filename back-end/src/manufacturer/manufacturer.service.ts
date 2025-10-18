import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturerRepository } from '../repositories/manufacturer.repository';

@Injectable()
export class ManufacturerService {
  constructor(private readonly manufacturerRepository: ManufacturerRepository) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerRepository.create(createManufacturerDto);
  }

  async findAll() {
    return this.manufacturerRepository.findAll();
  }

  async findOne(id: number) {
    const manufacturer = await this.manufacturerRepository.findOne(id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return manufacturer;
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    await this.findOne(id); // Validate existence
    return this.manufacturerRepository.update(id, updateManufacturerDto);
  }

  async remove(id: number) {
    await this.findOne(id); // Validate existence
    return this.manufacturerRepository.remove(id);
  }
}
