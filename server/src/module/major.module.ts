import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorController } from '../web/rest/major.controller';
import { MajorRepository } from '../repository/major.repository';
import { MajorService } from '../service/major.service';


@Module({
  imports: [TypeOrmModule.forFeature([MajorRepository])],
  controllers: [MajorController],
  providers: [MajorService],
  exports: [MajorService],
})
export class MajorModule {}
