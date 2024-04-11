import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandController } from '../web/rest/demand.controller';
import { DemandRepository } from '../repository/demand.repository';
import { DemandService } from '../service/demand.service';

@Module({
    imports: [TypeOrmModule.forFeature([DemandRepository])],
    controllers: [DemandController],
    providers: [DemandService],
    exports: [DemandService],
})
export class DemandModule {}
