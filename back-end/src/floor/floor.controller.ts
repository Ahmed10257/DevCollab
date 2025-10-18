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
import { FloorService } from './floor.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';

@Controller('floors')
export class FloorController {
    constructor(private readonly floorService: FloorService) {}

    @Post()
    create(@Body() createFloorDto: CreateFloorDto) {
        return this.floorService.create(createFloorDto);
    }

    @Get()
    findAll(@Query('buildingId', new ParseIntPipe({ optional: true })) buildingId?: number) {
        if (buildingId) {
            return this.floorService.findByBuilding(buildingId);
        }
        return this.floorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.floorService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFloorDto: UpdateFloorDto
    ) {
        return this.floorService.update(id, updateFloorDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.floorService.remove(id);
    }
}
