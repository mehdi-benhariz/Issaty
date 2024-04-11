import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DocumentDTO }  from '../service/dto/document.dto';
import { DocumentMapper }  from '../service/mapper/document.mapper';
import { DocumentRepository } from '../repository/document.repository';

const relationshipNames = [];
    relationshipNames.push('teacher');


@Injectable()
export class DocumentService {
    logger = new Logger('DocumentService');

    constructor(@InjectRepository(DocumentRepository) private documentRepository: DocumentRepository) {}

      async findById(id: number): Promise<DocumentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.documentRepository.findOne(id, options);
        return DocumentMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<DocumentDTO>): Promise<DocumentDTO | undefined> {
        const result = await this.documentRepository.findOne(options);
        return DocumentMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<DocumentDTO>): Promise<[DocumentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.documentRepository.findAndCount(options);
        const documentDTO: DocumentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(document => documentDTO.push(DocumentMapper.fromEntityToDTO(document)));
            resultList[0] = documentDTO;
        }
        return resultList;
      }

      async save(documentDTO: DocumentDTO, creator?: string): Promise<DocumentDTO | undefined> {
        const entity = DocumentMapper.fromDTOtoEntity(documentDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.documentRepository.save(entity);
        return DocumentMapper.fromEntityToDTO(result);
      }

      async update(documentDTO: DocumentDTO, updater?: string): Promise<DocumentDTO | undefined> {
        const entity = DocumentMapper.fromDTOtoEntity(documentDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.documentRepository.save(entity);
        return DocumentMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.documentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
