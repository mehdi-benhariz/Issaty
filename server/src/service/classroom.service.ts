import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ClassroomDTO }  from '../service/dto/classroom.dto';
import { ClassroomMapper }  from '../service/mapper/classroom.mapper';
import { ClassroomRepository } from '../repository/classroom.repository';

const relationshipNames = [];
    relationshipNames.push('subject');


@Injectable()
export class ClassroomService {
    logger = new Logger('ClassroomService');

    constructor(@InjectRepository(ClassroomRepository) private classroomRepository: ClassroomRepository) {}

      async findById(id: number): Promise<ClassroomDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.classroomRepository.findOne(id, options);
        return ClassroomMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<ClassroomDTO>): Promise<ClassroomDTO | undefined> {
        const result = await this.classroomRepository.findOne(options);
        return ClassroomMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<ClassroomDTO>): Promise<[ClassroomDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.classroomRepository.findAndCount(options);
        const classroomDTO: ClassroomDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(classroom => classroomDTO.push(ClassroomMapper.fromEntityToDTO(classroom)));
            resultList[0] = classroomDTO;
        }
        return resultList;
      }

      async save(classroomDTO: ClassroomDTO, creator?: string): Promise<ClassroomDTO | undefined> {
        const entity = ClassroomMapper.fromDTOtoEntity(classroomDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.classroomRepository.save(entity);
        return ClassroomMapper.fromEntityToDTO(result);
      }

      async update(classroomDTO: ClassroomDTO, updater?: string): Promise<ClassroomDTO | undefined> {
        const entity = ClassroomMapper.fromDTOtoEntity(classroomDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.classroomRepository.save(entity);
        return ClassroomMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.classroomRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
