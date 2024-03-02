import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SubjectDTO } from '../service/dto/subject.dto';
import { SubjectMapper } from '../service/mapper/subject.mapper';
import { SubjectRepository } from '../repository/subject.repository';

const relationshipNames = [];
relationshipNames.push('teacher');

@Injectable()
export class SubjectService {
    logger = new Logger('SubjectService');

    constructor(@InjectRepository(SubjectRepository) private subjectRepository: SubjectRepository) {}

    async findById(id: number): Promise<SubjectDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.subjectRepository.findOne(id, options);
        return SubjectMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<SubjectDTO>): Promise<SubjectDTO | undefined> {
        const result = await this.subjectRepository.findOne(options);
        return SubjectMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<SubjectDTO>): Promise<[SubjectDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.subjectRepository.findAndCount(options);
        const subjectDTO: SubjectDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((subject) => subjectDTO.push(SubjectMapper.fromEntityToDTO(subject)));
            resultList[0] = subjectDTO;
        }
        return resultList;
    }

    async save(subjectDTO: SubjectDTO, creator?: string): Promise<SubjectDTO | undefined> {
        const entity = SubjectMapper.fromDTOtoEntity(subjectDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.subjectRepository.save(entity);
        return SubjectMapper.fromEntityToDTO(result);
    }

    async update(subjectDTO: SubjectDTO, updater?: string): Promise<SubjectDTO | undefined> {
        const entity = SubjectMapper.fromDTOtoEntity(subjectDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.subjectRepository.save(entity);
        return SubjectMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.subjectRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
