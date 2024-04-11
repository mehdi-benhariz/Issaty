import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { MajorDTO } from '../service/dto/major.dto';
import { MajorMapper } from '../service/mapper/major.mapper';
import { MajorRepository } from '../repository/major.repository';

const relationshipNames = [];

@Injectable()
export class MajorService {
    logger = new Logger('MajorService');

    constructor(@InjectRepository(MajorRepository) private majorRepository: MajorRepository) {}

    async findById(id: number): Promise<MajorDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.majorRepository.findOne(id, options);
        return MajorMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<MajorDTO>): Promise<MajorDTO | undefined> {
        const result = await this.majorRepository.findOne(options);
        return MajorMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<MajorDTO>): Promise<[MajorDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.majorRepository.findAndCount(options);
        const majorDTO: MajorDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(major => majorDTO.push(MajorMapper.fromEntityToDTO(major)));
            resultList[0] = majorDTO;
        }
        return resultList;
    }

    async save(majorDTO: MajorDTO, creator?: string): Promise<MajorDTO | undefined> {
        const entity = MajorMapper.fromDTOtoEntity(majorDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.majorRepository.save(entity);
        return MajorMapper.fromEntityToDTO(result);
    }

    async update(majorDTO: MajorDTO, updater?: string): Promise<MajorDTO | undefined> {
        const entity = MajorMapper.fromDTOtoEntity(majorDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.majorRepository.save(entity);
        return MajorMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.majorRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
