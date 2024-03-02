import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { GroupDTO } from '../service/dto/group.dto';
import { GroupMapper } from '../service/mapper/group.mapper';
import { GroupRepository } from '../repository/group.repository';

const relationshipNames = [];
relationshipNames.push('subject');
relationshipNames.push('document');
relationshipNames.push('major');

@Injectable()
export class GroupService {
    logger = new Logger('GroupService');

    constructor(@InjectRepository(GroupRepository) private groupRepository: GroupRepository) {}

    async findById(id: number): Promise<GroupDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.groupRepository.findOne(id, options);
        return GroupMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<GroupDTO>): Promise<GroupDTO | undefined> {
        const result = await this.groupRepository.findOne(options);
        return GroupMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<GroupDTO>): Promise<[GroupDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.groupRepository.findAndCount(options);
        const groupDTO: GroupDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((group) => groupDTO.push(GroupMapper.fromEntityToDTO(group)));
            resultList[0] = groupDTO;
        }
        return resultList;
    }

    async save(groupDTO: GroupDTO, creator?: string): Promise<GroupDTO | undefined> {
        const entity = GroupMapper.fromDTOtoEntity(groupDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.groupRepository.save(entity);
        return GroupMapper.fromEntityToDTO(result);
    }

    async update(groupDTO: GroupDTO, updater?: string): Promise<GroupDTO | undefined> {
        const entity = GroupMapper.fromDTOtoEntity(groupDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.groupRepository.save(entity);
        return GroupMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.groupRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
