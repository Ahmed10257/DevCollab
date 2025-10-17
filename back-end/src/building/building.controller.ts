import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    ParseIntPipe,
    Query
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('buildings')
export class BuildingController {
    constructor(private readonly buildingService: BuildingService) {}

    @Post()
    create(@Body() createBuildingDto: CreateBuildingDto) {
        return this.buildingService.create(createBuildingDto);
    }

    @Get()
    findAll(@Query('branchId', ParseIntPipe) branchId?: number) {
        if (branchId) {
            return this.buildingService.findByBranch(branchId);
        }
        return this.buildingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.buildingService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBuildingDto: UpdateBuildingDto
    ) {
        return this.buildingService.update(id, updateBuildingDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.buildingService.remove(id);
    }
}
