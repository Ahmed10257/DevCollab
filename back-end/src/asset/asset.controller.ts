import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  findAll(
    @Query('categoryId', new ParseIntPipe({ optional: true })) categoryId?: number,
    @Query('typeId', new ParseIntPipe({ optional: true })) typeId?: number,
    @Query('branchId', new ParseIntPipe({ optional: true })) branchId?: number,
    @Query('buildingId', new ParseIntPipe({ optional: true })) buildingId?: number,
    @Query('floorId', new ParseIntPipe({ optional: true })) floorId?: number,
    @Query('roomId', new ParseIntPipe({ optional: true })) roomId?: number,
    @Query('status') status?: string,
    @Query('assignedUserId', new ParseIntPipe({ optional: true })) assignedUserId?: number,
    @Query('responsibleUserId', new ParseIntPipe({ optional: true })) responsibleUserId?: number,
    @Query('searchTerm') searchTerm?: string,
  ) {
    return this.assetService.findAll({
      categoryId,
      typeId,
      branchId,
      buildingId,
      floorId,
      roomId,
      status,
      assignedUserId,
      responsibleUserId,
      searchTerm,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetService.findOne(id);
  }

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetService.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assetService.remove(id);
  }
}
