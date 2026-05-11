import {
Injectable,
NotFoundException,
ConflictException,
} from '@nestjs/common';
import {
AssetRepository,
AssetFilters,
} from '../repositories/asset.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
constructor(private readonly assetRepository: AssetRepository) {}

async findAll(filters?: AssetFilters) {
return await this.assetRepository.findAll(filters);
}

async findOne(id: number) {
const asset = await this.assetRepository.findByIdWithDetails(id);
if (!asset) {
throw new NotFoundException(`Asset with ID ${id} not found`);
}
return asset;
}

async create(createAssetDto: CreateAssetDto) {
// Check if serial number already exists
const existing = await this.assetRepository.findBySerialNumber(
createAssetDto.serialNumber,
);
if (existing) {
throw new ConflictException(
`Asset with serial number ${createAssetDto.serialNumber} already exists`,
);
}

return await this.assetRepository.create(createAssetDto);
}

async update(id: number, updateAssetDto: UpdateAssetDto) {
const asset = await this.findOne(id);

// If serial number is being updated, check for conflicts
if (
updateAssetDto.serialNumber &&
updateAssetDto.serialNumber !== asset.serialNumber
) {
const existing = await this.assetRepository.findBySerialNumber(
updateAssetDto.serialNumber,
);
if (existing) {
throw new ConflictException(
`Asset with serial number ${updateAssetDto.serialNumber} already exists`,
);
}
}

return await this.assetRepository.update(id, updateAssetDto);
}

async remove(id: number) {
const asset = await this.findOne(id);
return await this.assetRepository.delete(id);
}
}
