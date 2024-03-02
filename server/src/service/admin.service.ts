import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AdminDTO } from '../service/dto/admin.dto';
import { AdminMapper } from '../service/mapper/admin.mapper';
import { AdminRepository } from '../repository/admin.repository';

const relationshipNames = [];

@Injectable()
export class AdminService {
    logger = new Logger('AdminService');

    constructor(@InjectRepository(AdminRepository) private adminRepository: AdminRepository) {}

    async findById(id: number): Promise<AdminDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.adminRepository.findOne(id, options);
        return AdminMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AdminDTO>): Promise<AdminDTO | undefined> {
        const result = await this.adminRepository.findOne(options);
        return AdminMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AdminDTO>): Promise<[AdminDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.adminRepository.findAndCount(options);
        const adminDTO: AdminDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach((admin) => adminDTO.push(AdminMapper.fromEntityToDTO(admin)));
            resultList[0] = adminDTO;
        }
        return resultList;
    }

    async save(adminDTO: AdminDTO, creator?: string): Promise<AdminDTO | undefined> {
        const entity = AdminMapper.fromDTOtoEntity(adminDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.adminRepository.save(entity);
        return AdminMapper.fromEntityToDTO(result);
    }

    async update(adminDTO: AdminDTO, updater?: string): Promise<AdminDTO | undefined> {
        const entity = AdminMapper.fromDTOtoEntity(adminDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.adminRepository.save(entity);
        return AdminMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.adminRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
