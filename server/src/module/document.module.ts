import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentController } from '../web/rest/document.controller';
import { DocumentRepository } from '../repository/document.repository';
import { DocumentService } from '../service/document.service';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentRepository])],
    controllers: [DocumentController],
    providers: [DocumentService],
    exports: [DocumentService],
})
export class DocumentModule {}
