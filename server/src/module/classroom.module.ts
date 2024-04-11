import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomController } from '../web/rest/classroom.controller';
import { ClassroomRepository } from '../repository/classroom.repository';
import { ClassroomService } from '../service/classroom.service';

@Module({
    imports: [TypeOrmModule.forFeature([ClassroomRepository])],
    controllers: [ClassroomController],
    providers: [ClassroomService],
    exports: [ClassroomService],
})
export class ClassroomModule {}
