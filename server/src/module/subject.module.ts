import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectController } from '../web/rest/subject.controller';
import { SubjectRepository } from '../repository/subject.repository';
import { SubjectService } from '../service/subject.service';

@Module({
    imports: [TypeOrmModule.forFeature([SubjectRepository])],
    controllers: [SubjectController],
    providers: [SubjectService],
    exports: [SubjectService],
})
export class SubjectModule {}
