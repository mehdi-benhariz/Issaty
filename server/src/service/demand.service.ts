import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DemandDTO } from '../service/dto/demand.dto';
import { DemandMapper } from '../service/mapper/demand.mapper';
import { DemandRepository } from '../repository/demand.repository';

const relationshipNames = [];
relationshipNames.push('student');

@Injectable()
export class DemandService {
    logger = new Logger('DemandService');

    constructor(@InjectRepository(DemandRepository) private demandRepository: DemandRepository) {}

    async findById(id: number): Promise<DemandDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.demandRepository.findOne(id, options);
        return DemandMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<DemandDTO>): Promise<DemandDTO | undefined> {
        const result = await this.demandRepository.findOne(options);
        return DemandMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<DemandDTO>): Promise<[DemandDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.demandRepository.findAndCount(options);
        const demandDTO: DemandDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(demand => demandDTO.push(DemandMapper.fromEntityToDTO(demand)));
            resultList[0] = demandDTO;
        }
        return resultList;
    }

    async save(demandDTO: DemandDTO, creator?: string): Promise<DemandDTO | undefined> {
        const entity = DemandMapper.fromDTOtoEntity(demandDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.demandRepository.save(entity);
        return DemandMapper.fromEntityToDTO(result);
    }

    async update(demandDTO: DemandDTO, updater?: string): Promise<DemandDTO | undefined> {
        const entity = DemandMapper.fromDTOtoEntity(demandDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.demandRepository.save(entity);
        return DemandMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.demandRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
