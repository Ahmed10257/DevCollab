import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { BranchesRepository } from '../repositories/branch.repository';

@Module({
    controllers: [BranchController],
    providers: [BranchService, BranchesRepository],
    exports: [BranchService, BranchesRepository],
})
export class BranchModule {}
